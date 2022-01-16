import { useState, useRef, useEffect } from "react";

const useSizeElement = () => {
  const elementRef = useRef(1800);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(elementRef.current.clientWidth);
  }, [elementRef.current]);

  return { width, elementRef };
};

export default useSizeElement;
