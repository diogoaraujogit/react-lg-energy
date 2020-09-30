import produce from 'immer';

const INITIAL_STATE = {
  barSelection: {},
};

export default function analytics(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@analytics/SET_BAR_SELECTION': {
        draft.barSelection = action.payload.barSelection;
        break;
      }

      default:
    }
  });
}
