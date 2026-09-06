'use client';

import { useSyncExternalStore } from 'react';

const key = 'mosobalaje_admin_auth_v1';
const eventName = 'mosobalaje-auth-change';
function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(eventName, onChange);
  return () => { window.removeEventListener('storage', onChange); window.removeEventListener(eventName, onChange); };
}
function getSnapshot() { try { return localStorage.getItem(key) === 'true'; } catch { return false; } }
function getServerSnapshot(): boolean | null { return null; }

/** Demo UI gate only. This is not server authorization. */
export function useDemoAuth() {
  const authenticated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setAuthenticated = (value: boolean) => {
    try {
      if (value) localStorage.setItem(key, 'true');
      else localStorage.removeItem(key);
    } catch { return; }
    window.dispatchEvent(new Event(eventName));
  };
  return [authenticated, setAuthenticated] as const;
}
