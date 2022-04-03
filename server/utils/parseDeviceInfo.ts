const parseDeviceInfo = (deviceInfo: string) => {
  const parsedJSON = JSON.parse(deviceInfo)

  return '' + parsedJSON.osName + ' ' + parsedJSON.osVersion + ' / ' + parsedJSON.browserName + ' ' + parsedJSON.browserFullVersion
}


export default parseDeviceInfo