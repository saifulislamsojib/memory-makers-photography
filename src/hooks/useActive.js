import { useCallback, useEffect, useRef } from "react";
import { useActiveValue } from "../context/ActiveContext";

const useActive = (id, isCall = true) => {
  const ref = useRef();
  const { seActive } = useActiveValue();

  if (!seActive) {
    throw new Error("ActiveProvider must be use");
  }

  const handleSet = useCallback(() => {
    if (isCall && ref.current) {
      if (ref.current.offsetTop <= window?.scrollY + 100) {
        seActive("#" + id);
      }
    }
  }, [id, isCall, seActive]);

  useEffect(() => {
    handleSet();
    window.addEventListener("scroll", handleSet);

    return () => window.removeEventListener("scroll", handleSet);
  }, [handleSet]);

  return ref;
};

export default useActive;
