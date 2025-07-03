export const initialState = {
  isDrawerOpen: false,
  activeSubmenu: null,
  isNavigationLocked: false,
  history: [],
};

export const ACTIONS = {
  TOGGLE_DRAWER: 'toggle_drawer',
  OPEN_SUBMENU: 'open_submenu',
  CLOSE_SUBMENU: 'close_submenu',
  LOCK: 'lock_nav',
  UNLOCK: 'unlock_nav',
  RECORD: 'record',
};

export function navigationReducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_DRAWER:
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case ACTIONS.OPEN_SUBMENU:
      return { ...state, activeSubmenu: action.key };
    case ACTIONS.CLOSE_SUBMENU:
      return { ...state, activeSubmenu: null };
    case ACTIONS.LOCK:
      return { ...state, isNavigationLocked: true };
    case ACTIONS.UNLOCK:
      return { ...state, isNavigationLocked: false };
    case ACTIONS.RECORD:
      return { ...state, history: action.history };
    default:
      return state;
  }
} 