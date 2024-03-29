import { useCallback, useEffect, useRef } from "react";
import { useActiveValue } from "../context/ActiveContext";

const useActive = (id, isCall = true) => {
  const ref = useRef();
  const { seActive } = useActiveValue();

  if (!seActive && isCall) {
    throw new Error("ActiveProvider must be use");
  }

  const handleSet = useCallback(() => {
    if (ref.current) {
      if (ref.current.offsetTop <= window?.scrollY + 100) {
        seActive("#" + id);
      }
    }
  }, [id, seActive]);

  useEffect(() => {
    if (isCall) {
      handleSet();
      window.addEventListener("scroll", handleSet);

      return () => window.removeEventListener("scroll", handleSet);
    }
  }, [handleSet, isCall]);

  return ref;
};

export default useActive;
