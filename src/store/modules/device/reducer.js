import produce from 'immer';

const INITIAL_STATE = {
  device: {},
};

export default function device(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@device/SET_DEVICE': {
        draft.device = action.payload.device;
        break;
      }

      default:
    }
  });
}
