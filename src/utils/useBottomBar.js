import { useEffect } from "react";

/**
 * Adds a body class while a mobile sticky action bar is active so global
 * floating chat widgets automatically elevate and never overlap page buttons.
 */
export function useBottomBar() {
  useEffect(() => {
    document.body.classList.add("has-bottom-bar");
    return () => {
      document.body.classList.remove("has-bottom-bar");
    };
  }, []);
}
