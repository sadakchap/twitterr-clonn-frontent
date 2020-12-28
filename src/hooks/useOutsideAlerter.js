import { useEffect } from "react";

const useOutsideAlerter = (ref, toggleState) => {
  useEffect(() => {
    function handleClickEvent(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        toggleState(false);
      }
    }
    document.addEventListener("mousedown", handleClickEvent);
    return () => {
      document.removeEventListener("mousedown", handleClickEvent);
    };
  }, [ref, toggleState]);
};

export default useOutsideAlerter;
