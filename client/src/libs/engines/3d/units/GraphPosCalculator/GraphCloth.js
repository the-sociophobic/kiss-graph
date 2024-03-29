import THREE from 'libs/engines/3d/three'

import PhysicalUnit from 'libs/engines/physics/PhysicalUnit'

export default class GraphCloth extends PhysicalUnit {
  constructor(props) {
    super(props)

    this.maxWeight = 0
    props.nodes.forEach((node, index) => {
      if (node.connections > this.maxWeight) {
        this.maxWeight = node.connections
        this.maxWeightIndex = index
        this.maxWeightId = node.id
      }
    })
    console.log(this.maxWeight)
    // this.nodes
    //   .forEach(node => node.vector.sub(this.nodes[this.maxWeightIndex].vector))

    this.nodes = props.nodes
    // .filter(node => node.connections > 0) //TODO TOFIX
      .map(node => ({
        id: node.id,
        vector: //node.pos ? 
        // new THREE.Vector3(node.pos.x, node.pos.y, node.pos.z)
        // :
        new THREE.Vector3(
          // node.posRaw.x * 2.15,
          // node.posRaw.y * 2.15,
          // Math.random() * (60 - node.connections) / 15
          node.pos.x - props.nodes[this.maxWeightIndex].pos.x,
          node.pos.y - props.nodes[this.maxWeightIndex].pos.y,
          node.pos.z - props.nodes[this.maxWeightIndex].pos.z
        ),
        weight: node.connections > 0 ? node.connections : .5, //TODO
        staticPos: node.staticPos,
      }))
    

    this.edges = props.edges
    this.forces = Array
      .from(Array(this.nodes.length))
      .map(() => new THREE.Vector3())
    this.velocities = Array
      .from(Array(this.nodes.length))
      .map(() => new THREE.Vector3())
  }

  recalculate = deltaTime => {
    let { nodes, edges, forces, velocities } = this

    //FORCE RECALCULATE
    forces.forEach(force => force.multiplyScalar(0))

    //VELOCITY ATTENUATION
    velocities.forEach(velocity => velocity.multiplyScalar(.25 + velocityAttenuation ** velocity.lengthSq()))

    //INTERMOLECULAR FORCES
    nodes
      .slice(0, -1)
      .forEach((node0, index0) => {
        nodes.slice(index0)
          .forEach((node1, index1) => {
            //
            if (
              (node0.weight === 1 && node1.weight !== 1) ||
              (node1.weight === 1 && node0.weight !== 1)
            )
              return
            let force = intermolecularForce(node0, node1)
            forces[index0]
            .sub(force)
            .clampLength(0, maxVectorLength)
            forces[index0 + index1]
            .add(force)
            .clampLength(0, maxVectorLength)
          })
      })

    //EDGE RESISTANCE FORCES
    edges.forEach(edge => {
      const node0 = nodes[edge.node0]
      const node1 = nodes[edge.node1]
      const force = edgeResistanceForce(node0, node1)
      
      forces[edge.node0]
      .add(force)
      .clampLength(0, maxVectorLength)
      forces[edge.node1]
      .sub(force)
      .clampLength(0, maxVectorLength)
    })

    //RETURN INTO TESTING SPHERE FORCE
    nodes.forEach((node, index) => {
      const distanceFromCenter = node.vector.length()
      const overflow = distanceFromCenter - overflowForceDistanceFromCenter
      if (overflow > 0) {
        const force = node.vector
        .clone().normalize()
        .multiplyScalar(-overflow / overflowForceDistanceFromCenter * overflowForceK)
        forces[index]
        .add(force)
        .clampLength(0, maxVectorLength)
      }
    })
    //RETURN TO CENTER FORCE
    nodes.forEach((node, index) => {
      const distanceFromCenter = node.vector.lengthSq()
      const force = node.vector
      .clone().normalize()
      .multiplyScalar(distanceFromCenter * (node.weight ** .5) * returnToCenterForceK)
      forces[index]
      .sub(force)
      .clampLength(0, maxVectorLength)
    })
    //CLAMP FORCES
    nodes.forEach((node, index) => {
      const distanceFromCenter = node.vector.length()
      if (distanceFromCenter > clampDistanceFromCenter) {
        const normal = node.vector.clone().normalize()
        const forceOverflow = forces[index].clone().dot(normal)
        if (forceOverflow > 0)  
          forces[index].sub(normal.clone().multiplyScalar(forceOverflow))
      }
    })
    //UP FORCE FOR Nihilisst_R4VE cover3
    // nodes.forEach((node, index) => {
    //   const force = new THREE.Vector3(0, (node.vector.y < 0 ? 3 : 1) / ((node.vector.y ** 1.55) + .05) * 555, 0)
    //   forces[index]
    //   .add(force)
    //   .clampLength(0, maxVectorLength)
    // })
    
    //RECALCULATE VELOCITIES
    velocities.forEach((velocity, index) => {
      let force = forces[index]
      const node = nodes[index]
      //force here gets mutated, but I don't care, I won't use it again
      velocity
      .add(force.multiplyScalar(deltaTime / node.weight))
      .clampLength(0, maxVectorLength)
    })

    //RECALCULATE POSITIONS
    nodes.forEach((node, index) => {
      if (node.weight === this.maxWeight)
        return
      const velocity = velocities[index]
      if (!node.staticPos)
        node.vector
        .add(velocity.clone().multiplyScalar(deltaTime))
      // .clampLength(0, clampDistanceFromCenter)
    })
  }

  getRecalculatedPos = () => this.nodes
    .map(node => ({
      id: node.id,
      pos: node.vector.toArray(),
    }))
}


const velocityAttenuation = .975

const overflowForceK = 10
const overflowForceDistanceFromCenter = 45
const clampDistanceFromCenter = 60
const returnToCenterForceK = 0

const maxVectorLength = 50000

const edgeLengthK = .5
const edgeLength = (weight0, weight1) => {
  const localWeight0 = weight0 + 2
  const localWeight1 = weight1 + 2
  return ((localWeight0 * localWeight1) ** .5) * edgeLengthK
}

const intermolecularForceK = 25
const intermolecularForce = (node0, node1) => {
  let distance = node0.vector.clone().sub(node1.vector)
  const weightInfluence = (node0.weight * node1.weight) ** 1
  let K = -1 * intermolecularForceK * weightInfluence / distance.lengthSq()
  if (!isFinite(K))
    K = -10000
  return distance
  .normalize()
  .multiplyScalar(K)
  .clampLength(0, maxVectorLength)
}

const edgeResistanceK = 4200
const edgeResistanceForce = (node0, node1) => {
  let subVector = node0.vector.clone().sub(node1.vector)
  const currentLength = subVector.length()
  const idealLength = edgeLength(node0.weight, node1.weight)
  const deformation = (idealLength - currentLength) / idealLength

  return subVector
  .normalize()
  .multiplyScalar(deformation * edgeResistanceK)
  .clampLength(0, maxVectorLength)
}