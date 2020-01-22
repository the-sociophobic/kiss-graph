import THREE from 'libs/engines/3d/three'

export default (nodes, edges) => {
  let bufferGeometry = new THREE.BufferGeometry()

  const vertices = new Float32Array(
    edges
      .map(edge => [
        ...nodes[edge.node0].vector.toArray(),
        ...nodes[edge.node1].vector.toArray(),
      ])
      .reduce((a, b) => [...a, ...b])
  )
  let verticesBuffer = new THREE.BufferAttribute(vertices, 3)
  verticesBuffer.dynamic = true

  bufferGeometry.setAttribute('position', verticesBuffer)

  let material = new THREE.MeshBasicMaterial( { color: 0x0000ff } )

  return new THREE.LineSegments( bufferGeometry, material )

}