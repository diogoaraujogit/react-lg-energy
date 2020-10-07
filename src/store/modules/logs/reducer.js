import produce from 'immer';

const INITIAL_STATE = {
  logSelection: {},
};

export default function logs(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@logs/SET_LOG_SELECTION': {
        draft.logSelection = action.payload.logSelection;
        break;
      }

      default:
    }
  });
}
