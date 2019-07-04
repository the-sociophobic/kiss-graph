import THREE from 'libs/engines/3d/three'

import PhysicalUnit from './PhysicalUnit'

export default class GraphCloth extends PhysicalUnit {
  constructor(props) {
    super(props)

    this.nodes = [...props.nodes]
    this.edges = props.edges
    this.forces = Array
      .from(Array(this.nodes.length))
      .map(() => new THREE.Vector3())
    this.velocities = Array
      .from(Array(this.nodes.length))
      .map(() => new THREE.Vector3())
  }

  // recalculate = deltaTime => {
  //   const { nodes, edges, forces, velocities } = this

  //   //ATTENUATION
  //   forces.forEach((force, index) => {
  //     let resistanceForce = velocities[index].clone()
  //       .multiplyScalar(attenuationK * deltaTime)
  //     force.sub(resistanceForce)
  //     // force.multiplyScalar(.5)
  //   })

  //   //FORCES ADDITION
  //   edges.forEach(edge => {
  //     const force = edgeForce(nodes[edge.node0], nodes[edge.node1])
  //     forces[edge.node0].add(force)
  //     forces[edge.node1].add(force.multiplyScalar(-1))
  //   })

  //   //VELOCITY, MOVEMENT CALCULATION
  //   this.nodes.forEach((node, index) => {
  //     const velocityChange = forces[index].clone().multiplyScalar(deltaTime / node.weight)
  //     velocities[index].add(velocityChange)
  //     node.vector
  //       .add(velocities[index].clone().multiplyScalar(deltaTime * velocityK))
  //       .clampLength(0, maxLength)
  //     // if (isNaN(node.vector.x))
  //     //   console.log(node.vector)
  //   })
  // }

  recalculate = deltaTime => {
    let { nodes, edges, forces, velocities } = this

    forces.forEach(force => force.multiplyScalar(forceAttenuation))

    nodes
      .slice(0, -1)
      .forEach((node0, index0) => {
        nodes.slice(index0)
          .forEach((node1, index1) => {
            let force = intermolecularForce(node0, node1)
            forces[index0].add(force)
            forces[index0 + index1].add(force.multiplyScalar(-1))
          })
      })
    
    //FORCES TO POS
    nodes.forEach((node, index) => {
      const force = forces[index]      
      node.vector
        .add(force.clone().multiplyScalar(deltaTime / node.weight))
        .clampLength(0, maxLength)
    })
  }

  getRecalculatedPos = () => this.nodes
    .map(node => node.vector.toArray())
}


const velocityK = 1
const attenuationK = 0
const forceAttenuation = .999
const edgeLengthK = 1
const edgeForceK = 1
const maxLength = 3.5

const edgeLength = (weight0, weight1) => Math.pow(weight0 * weight1, .5) * edgeLengthK
const edgeForce = (node0, node1) => {
  let dist = node0.vector.clone().sub(node1.vector)
  const lenght = edgeLength(node0.weight, node1.weight)
  let delta = (lenght - dist.length()) / lenght

  return dist.multiplyScalar(delta * Math.abs(delta) * node0.weight * node1.weight * edgeForceK)
}



const intermolecularForceK = .24
const intermolecularForce = (node0, node1) => {
  let distance = node0.vector.clone().sub(node1.vector)
  return distance.multiplyScalar(-distance.length() * intermolecularForceK * node0.weight * node1.weight)
}