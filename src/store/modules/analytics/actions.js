export function setBarSelection(barSelection) {

  return {
    type: '@analytics/SET_BAR_SELECTION',
    payload: { barSelection }
  }
}

export function setLineSelection(lineSelection) {

  return {
    type: '@analytics/SET_LINE_SELECTION',
    payload: { lineSelection }
  }
}