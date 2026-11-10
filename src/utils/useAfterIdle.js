import { useEffect, useState } from 'react';

// Returns false on the first render and true once the browser is idle (or after `timeout` ms at the latest).
// Used to mount decorative extras (WebGL background, custom cursor, heavy headings) after the page has painted,
// so they never compete with the content a visitor came to see.
export default function useAfterIdle(timeout = 1500) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const go = () => setReady(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(go, { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(go, 250);
    return () => window.clearTimeout(id);
  }, [timeout]);

  return ready;
}
