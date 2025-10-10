"use client";

import { CSSProperties, type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const RootPortal = ({
  children,
  style,
  className,
  onClick,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}) => {
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (elementRef) {
      return;
    }

    const el = document.createElement("div");
    if (style) {
      Object.assign(el.style, style);
    }
    if (className) {
      el.className = className;
    }
    if (onClick) {
      el.onclick = onClick;
    }

    document.body.appendChild(el);
    setElementRef(el);

    return () => {
      document.body.removeChild(el);
      setElementRef(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!elementRef) {
    return null;
  }

  return createPortal(children, elementRef);
};
