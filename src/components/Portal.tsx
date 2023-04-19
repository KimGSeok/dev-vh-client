import React, { useState, useEffect } from 'react';
import { createPortal } from "react-dom";

const Portal = ({ id, children }: { id: string, children: React.ReactNode }) => {

  const [mounted, setMounted] = useState<boolean>(false);
  const element = typeof window !== "undefined" && document.querySelector(id);
  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, [])

  return element && mounted && children ? createPortal(children, element) : null;
}

export default Portal;