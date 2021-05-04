import THREE from 'libs/engines/3d/three'
import heatMap from 'img/heat32.png'
import isProduction from 'libs/utils/isProduction'


const heatMapOffset = {
  uOffset: [0, 6 / 32],
  vOffset: [1 / 4, 1 / 4],
}
const interpolateUOffset = u => u * (1 - heatMapOffset.uOffset[0] - heatMapOffset.uOffset[1]) + heatMapOffset.uOffset[0]
const interpolateVOffset = v => v * (1 - heatMapOffset.vOffset[0] - heatMapOffset.vOffset[1]) + heatMapOffset.vOffset[0]

export default (store, scene) => {
  var finalMesh
  // let textureLoader = new THREE.TextureLoader()
  new THREE.TextureLoader()
    .load(heatMap, texture => {
      // texture.magFilter = THREE.NearestFilter;
      // texture.minFilter = THREE.LinearMipMapLinearFilter;
      let material = new THREE.MeshBasicMaterial( { map: texture } )
      // let material = new ShaderMaterial({
      //   fragmentShader: `
      //     void main()	{
      //       gl_FragColor = vec4(vec3(min(x, y)), 1.);
      //     }
      //     `,
      //   vertexShader: `
      //     void main()	{
      //       gl_Position = vec4( position, 1.0 );
      //     }
      //   `,
      //   uniforms: {
      //     texture: { type: "t", value: texture }
      //   },      
      // })

      if (isProduction()) {
        let bufferGeometry = new THREE.BufferGeometry()
        bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(store.getGeometry().position), 3 ) )
        bufferGeometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array(store.getGeometry().uv), 2 ) )

        finalMesh = new THREE.Mesh(bufferGeometry, material)
      } else {
        store.get().edges
        .forEach(edge => {
          const node0 = store.get().nodes.map(node => node.id).indexOf(edge.node0)
          const node1 = store.get().nodes.map(node => node.id).indexOf(edge.node1)
          if (node0 === -1) {
            console.log(edge.node0)
            console.log(edge)
          }
          if (node1 === -1) {
            console.log(edge.node1)
            console.log(edge)
          }
        })

        let edges = store.get().edges
          .filter(edge => edge.type === "KISS" || edge.type === "DEBATED")      
          .map(edge => ({
            type: edge.type,
            node0: store.get().nodes.map(node => node.id).indexOf(edge.node0),
            node1: store.get().nodes.map(node => node.id).indexOf(edge.node1),
          }))
    
        let nodes = store.get().nodes
          .map(node => ({
            vector: new THREE.Vector3(node.pos.x, node.pos.y, node.pos.z),
            weight: node.connections,
            uv: node.uv,
          }))

        let bufferGeometry = new THREE.BufferGeometry()
          .fromGeometry(cylinderGraphGeometry(nodes, edges, 3))

        finalMesh = new THREE.Mesh(bufferGeometry, material)

        store.setGeometry({
          position: finalMesh.toJSON().geometries[0].data.attributes.position.array,
          uv: finalMesh.toJSON().geometries[0].data.attributes.uv.array,
        })
      }

      scene.add(finalMesh)
    })
  // let material = new THREE.MeshBasicMaterial( { color: 0xfff000 } )
  // let bufferGeometry = new THREE.BufferGeometry()
  //   .fromGeometry(cylinderGraphGeometry(nodes, edges, 3))
  // finalMesh = new THREE.Mesh(bufferGeometry, material)

  // return finalMesh
}

const cylinderVertices = (R, length, segments, weight0, weight1, disabled) => {
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

    uvs[i * 4]     = interpolateUOffset(weight0)
    uvs[i * 4 + 1] = interpolateVOffset(disabled ? 1 : 0)
    uvs[i * 4 + 2] = interpolateUOffset(weight1)
    uvs[i * 4 + 3] = interpolateVOffset(disabled ? 1 : 0)
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

    if (typeof edge.node0 !== "number" || typeof edge.node1 !== "number") {
      console.log("edge error")
      console.log(edge)
    }

    subVectors.subVectors(node1.vector, node0.vector)
    normal.copy(subVectors).normalize()
    quaternion.setFromUnitVectors(up, normal)

    let cylinderData = cylinderVertices(.05, subVectors.length(), segments, node0.uv, node1.uv, edge.type === "DEBATED")
    let cylinder = new THREE.BufferGeometry()
    cylinder.setAttribute('position', new THREE.BufferAttribute(cylinderData.vertices, 3))
    cylinder.setAttribute('uv', new THREE.BufferAttribute(cylinderData.uvs, 2))
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
  cylinderMeshes.forEach(mesh =>
    mergedGeometry.mergeMesh(mesh)
  )

  return mergedGeometry
}
