import produce from 'immer';

const INITIAL_STATE = {
  group: {},
};

export default function group(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@group/SET_GROUP': {
        draft.group = action.payload.group;
        break;
      }

      default:
    }
  });
}
