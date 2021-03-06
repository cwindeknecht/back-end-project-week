import * as actions from '../actions/index';

const initialState = {
  current: 'login',
  note: null,
  results: [],
  remove: false,
  currentUserNotes: [],
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_BUTTON_CLICK:
      return { ...state, current: action.payload, remove: false };
    case actions.VIEW_BUTTON_CLICK:
      return { ...state, current: action.payload };
    case actions.VIEW_NOTE:
      return { ...state, current: action.payload.current, note: action.payload.note };
    case actions.EDIT_NOTE_CLICKED:
      return { ...state, current: action.payload.current, note: action.payload.note };
    case actions.SEARCH_BUTTON_CLICK:
      return { ...state, current: action.payload };
    case actions.SEARCH_RESULTS_CLICKED:
      return { ...state, current: action.payload.current, results: action.payload.results };
    case actions.SORT_BUTTON_CLICKED:
      return { ...state, current: action.payload };
    case actions.DOWNLOAD_BUTTON_CLICKED:
      return { ...state, current: action.payload };
    case actions.REMOVE_EDIT:
      return { ...state, remove: action.payload };
    case actions.LOAD_USER_NOTES:
      return { ...state, currentUserNotes: action.payload.notes, currentUser: action.payload.user };
    case actions.NEW_USER_CREATION:
      return {
        ...state,
        currentUserNotes: action.payload.notes,
        currentUser: action.payload.userID,
        current: 'list',
      };
    case actions.HANDLE_LOG_OUT:
      return {
        ...state,
        current: 'login',
        note: null,
        results: [],
        remove: false,
        currentUserNotes: [],
        currentUser: null,
      };
    case actions.UPDATE_CHECK_LIST:
      const currentNotes = state.currentUserNotes;
      const checklist = currentNotes[action.payload.index].checklist;
      checklist.push({
        note: action.payload.note,
        id: action.payload.checkID,
        index: checklist.length,
        checked: action.payload.checked,
      });
      return { ...state, currentUserNotes: currentNotes };
    case actions.TOGGLE_CHECK:
      const currentUsernotes = state.currentUserNotes;
      currentUsernotes.splice(state.note.index, 1, action.payload);
      return { ...state, currentUserNotes: currentUsernotes };
    case actions.USER_LOGIN:
      return {
        ...state,
        currentUserNotes: action.payload.notes,
        currentUser: action.payload.userID,
        current: 'list',
      };
    case actions.LOAD_NOTES:
      return { ...state, currentUserNotes: action.payload };
    default:
      return state;
  }
};
