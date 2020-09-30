export function setBarSelection(barSelection) {

  return {
    type: '@analytics/SET_BAR_SELECTION',
    payload: { barSelection }
  }
}