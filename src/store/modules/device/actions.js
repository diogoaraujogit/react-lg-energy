export function setDevice(device) {

  return {
    type: '@device/SET_DEVICE',
    payload: { device }
  }
}