import Unit from 'libs/engines/3d/Unit'
import GraphCloth from './GraphCloth'
// import copyToClipboard from 'libs/utils/copyToClipboard'
import { updateNodes, updateEdges } from 'libs/engines/data/store/Neo4j'


const msPerFrame = 450


export default class GraphPosCalculator extends Unit {
  constructor(props) {
    super(props)
    const { THREE, scene } = props
    const { nodes, edges } = this.props.store.get()

    this.edges = edges
      .filter(edge => edge.type === "KISS" || edge.type === "DEBATED")
      .map(edge => ({
        node0: nodes.map(node => node.id).indexOf(edge.node0),
        node1: nodes.map(node => node.id).indexOf(edge.node1),
      }))

    this.GraphCloth = new GraphCloth({
      nodes: nodes,
      edges: this.edges,
    })

    this.geometry = new THREE.BufferGeometry();

    const positions = this.GraphCloth.getRecalculatedPos()
    // console.log(positions)
    const vertices = new Float32Array(
      this.edges
        .map(edge => [
          ...positions[edge.node0].pos,
          ...positions[edge.node1].pos,
        ])
        .reduce((a, b) => [...a, ...b])
    )
    this.verticesBuffer = new THREE.BufferAttribute(vertices, 3)
    this.verticesBuffer.dynamic = true

    this.geometry.setAttribute('position', this.verticesBuffer)

    //START CALC
    this.deltaTime = .005
    this.frameNumber = 0
    this.interval = this.generateInterval()
    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    this.line = new THREE.LineSegments( this.geometry, material );
    scene.add( this.line )
  }

  generateInterval = () =>
    setInterval(() => {
      this.frameNumber++

      this.GraphCloth.recalculate(this.deltaTime)
      const positions = this.GraphCloth.getRecalculatedPos()
      const vertices = new Float32Array(
        this.edges
          .map(edge => [
            ...positions[edge.node0].pos,
            ...positions[edge.node1].pos,
          ])
          .reduce((a, b) => [...a, ...b])
      )
      this.verticesBuffer.array = vertices
      this.verticesBuffer.needsUpdate = true

      // if (this.frameNumber === 3000)
      //   this.props.sendData(
      //     JSON.stringify(positions.map(pos => ({
      //       x: pos[0],
      //       y: pos[1],
      //       z: pos[2],
      //     })))
      //   )
      
      // if (this.frameNumber % 100 === 0)
      //   console.log(this.frameNumber)


    }, msPerFrame)

  pause() {
    if (!this.interval)
      this.interval = this.generateInterval()
    else {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  async save() {
    const positions = this.GraphCloth.getRecalculatedPos()
    const nodes = positions.map(pos => ({
      ...this.props.store.get({id: pos.id}),
      pos: {
        x: pos.pos[0],
        y: pos.pos[1],
        z: pos.pos[2],
      }    
    }))

    const res = await updateNodes(nodes)
    // const res = await updateEdges(this.props.store.get().edges.map(edge => ({...edge, type: "KISS"})))

    console.log("updated positions")
    console.log(res)
    // console.log(nodes)
    // console.log("nodes updated")
    // const edges = this.props.store.get().edges
    // copyToClipboard(JSON.stringify({
    //   nodes: nodes,
    //   edges: edges,
    // }))
    // for (const pos of positions) {
    //   const node = {
    //     ...this.props.store.get({id: pos.id}),
    //     pos: {
    //       x: pos.pos[0],
    //       y: pos.pos[1],
    //       z: pos.pos[2],
    //     }
    //   }
    //   await this.props.store.push(node)
    // }
  }

  animate() {
  }
  dispose() {}
}