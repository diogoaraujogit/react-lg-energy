import produce from 'immer';

const initialLanguage = localStorage.getItem('@lg/language')

const INITIAL_STATE = {
  language: initialLanguage || 'en',
  english: initialLanguage === 'en',
};

export default function intl(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@intl/SET_LANGUAGE': {
        draft.language = action.payload.language;
        draft.english = action.payload.language === 'en'? true : false
        localStorage.setItem('@lg/language', action.payload.language)
        break;
      }

      default:
    }
  });
}
