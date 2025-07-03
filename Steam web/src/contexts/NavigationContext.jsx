import { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import NavigationHistory from './navigationHistory';
import { navigationReducer, initialState, ACTIONS } from './navigationReducer';
import { logEvent } from '../analytics';
import { sendDuration } from '../utils/performance';

const NavigationContext = createContext(null);

const historyBuffer = new NavigationHistory(10);

export function NavigationProvider({ children }) {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  // Helper to record actions and push into history buffer
  const record = useCallback((action, metadata = {}) => {
    historyBuffer.push({ action, metadata });
    dispatch({ type: ACTIONS.RECORD, history: historyBuffer.getAll() });
    // Send high-level analytic event (can be expanded later)
    logEvent('nav', action);
  }, []);

  // Public actions
  const toggleDrawer = useCallback(() => {
    if (state.isNavigationLocked) return;
    record(state.isDrawerOpen ? 'drawer_close' : 'drawer_open');
    dispatch({ type: ACTIONS.TOGGLE_DRAWER });
  }, [state.isDrawerOpen, state.isNavigationLocked, record]);

  const openSubmenu = useCallback((key) => {
    if (state.isNavigationLocked) return;
    record('submenu_open', { key });
    dispatch({ type: ACTIONS.OPEN_SUBMENU, key });
  }, [state.isNavigationLocked, record]);

  const closeSubmenu = useCallback(() => {
    record('submenu_close');
    dispatch({ type: ACTIONS.CLOSE_SUBMENU });
  }, [record]);

  const lockNavigation = useCallback((reason) => {
    record('lock_navigation', { reason });
    dispatch({ type: ACTIONS.LOCK });
  }, [record]);

  const unlockNavigation = useCallback(() => {
    if (state.lockStart) {
      sendDuration('lock_duration', Date.now() - state.lockStart);
    }
    record('unlock_navigation');
    dispatch({ type: ACTIONS.UNLOCK });
  }, [state.lockStart, record]);

  const value = useMemo(
    () => ({
      state,
      toggleDrawer,
      openSubmenu,
      closeSubmenu,
      lockNavigation,
      unlockNavigation,
      record,
    }),
    [state, toggleDrawer, openSubmenu, closeSubmenu, lockNavigation, unlockNavigation, record]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
} 