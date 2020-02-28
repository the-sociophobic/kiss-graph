export default () => //true ||
  process.env.REACT_APP_STAGE === 'live' || process.env.REACT_APP_STAGE === 'prod'