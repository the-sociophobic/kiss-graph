import THREE from 'libs/engines/3d/three'
import heatMap from 'img/heat2.png'

export default (nodesInput, edges, scene) => {
  let distribution = Array.from(
    new Set(
      nodesInput.map(node => node.weight)))
  .sort((a, b) => a - b)
  const positionInArray = (array, value) => {
    let i
    for (i = 0; value > array[i]; i++)
      ;
    return i
  }
  const nodeUV = weight => positionInArray(distribution, weight) / distribution.length

  let nodes = nodesInput.map(node => ({
    ...node,
    uv: nodeUV(node.weight)
  }))

  var finalMesh
  // let textureLoader = new THREE.TextureLoader()
  new THREE.TextureLoader()
    .load(heatMap, texture => {
      let material = new THREE.MeshBasicMaterial( { map: texture } )
      let bufferGeometry = new THREE.BufferGeometry()
        .fromGeometry(cylinderGraphGeometry(nodes, edges, 3))
      finalMesh = new THREE.Mesh(bufferGeometry, material)

      scene.add(finalMesh)
    })
  // let material = new THREE.MeshBasicMaterial( { color: 0xfff000 } )
  // let bufferGeometry = new THREE.BufferGeometry()
  //   .fromGeometry(cylinderGraphGeometry(nodes, edges, 3))
  // finalMesh = new THREE.Mesh(bufferGeometry, material)

  // return finalMesh
}

const cylinderVertices = (R, length, segments, weight0, weight1) => {
  var vertices = [segments * 2 * 3]
  var uvs = [segments * 2 * 2]

  for (var i = 0; i < segments; i++) {
    const angle = Math.PI * 2 * i / segments
    const x = Math.sin(angle) * R
    const y = length
    const z = Math.cos(angle) * R

    vertices[i * 6]     = x
    vertices[i * 6 + 1] = 0
    vertices[i * 6 + 2] = z
    vertices[i * 6 + 3] = x
    vertices[i * 6 + 4] = y
    vertices[i * 6 + 5] = z

    uvs[i * 4]     = weight0
    uvs[i * 4 + 1] = 0
    uvs[i * 4 + 2] = weight1
    uvs[i * 4 + 3] = 0
  }

  return {
    vertices: new Float32Array(vertices),
    uvs: new Float32Array(uvs),
  }
}

const cylinderGraphGeometry = (nodes, edges, segments) => {
  const up = new THREE.Vector3(0, 1, 0)
  let node0
  let node1
  let subVectors = new THREE.Vector3()
  let normal = new THREE.Vector3()
  let quaternion = new THREE.Quaternion()

  let indices = [segments * 6]
  for (let i = 0; i < segments; i++) {
    indices[i * 6]     = i * 2 
    indices[i * 6 + 1] = (i * 2 + 2) % (segments * 2)
    indices[i * 6 + 2] = (i * 2 + 1)
    indices[i * 6 + 3] = (i * 2 + 1)
    indices[i * 6 + 4] = (i * 2 + 2) % (segments * 2)
    indices[i * 6 + 5] = (i * 2 + 3) % (segments * 2)
  }

  let indicesAttribute = new THREE.BufferAttribute(new Uint8Array(indices), 1)


  let cylinderMeshes = edges.map(edge => {
    node0 = nodes[edge.node0]
    node1 = nodes[edge.node1]
    subVectors.subVectors(node1.vector, node0.vector)
    normal.copy(subVectors).normalize()
    quaternion.setFromUnitVectors(up, normal)

    let cylinderData = cylinderVertices(.05, subVectors.length(), segments, node0.uv, node1.uv)
    let cylinder = new THREE.BufferGeometry()
    cylinder.addAttribute('position', new THREE.BufferAttribute(cylinderData.vertices, 3))
    cylinder.addAttribute('uv', new THREE.BufferAttribute(cylinderData.uvs, 2))
    cylinder.setIndex(indicesAttribute)
    
    //have to convert BufferGeometry into Geometry to .merge() meshes
    let cylinderMesh = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(cylinder))
    cylinderMesh.translateX(node0.vector.x)
    cylinderMesh.translateY(node0.vector.y)
    cylinderMesh.translateZ(node0.vector.z)
    cylinderMesh.applyQuaternion(quaternion)
    
    return cylinderMesh
  })
  
  let mergedGeometry = new THREE.Geometry()
  cylinderMeshes.forEach((mesh, index) =>
    mergedGeometry.mergeMesh(mesh)
  )

  return mergedGeometry
}
