import Graph from 'libs/engines/3d/units/Graph'
import GraphPosCalculator from 'libs/engines/3d/units/GraphPosCalculator'
// import Skybox from 'libs/engines/3d/units/Skybox'

export default {
  units: {
    // Skybox,
    heatGraph: {
      unit: Graph,
      disabled: false,
    },
    graphCalc: {
      unit: GraphPosCalculator,
      disabled: true,
    },
  }
}