"use client";

import { useState, useEffect } from "react";
import mermaid from "mermaid";

export const MermaidRenderer = ({ children }: { children: unknown }) => {
  const [element, setElement] = useState<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!element) {
      return;
    }

    const showChildError = (type: string) => {
      element.innerHTML = `<pre style="color: red;">Error rendering Mermaid diagram: ${type}</pre>`;
    };

    // code > string
    if (
      typeof children !== "object" ||
      children === null ||
      Array.isArray(children) ||
      !("type" in children) ||
      children.type !== "code" ||
      !("props" in children) ||
      typeof children.props !== "object" ||
      children.props === null ||
      Array.isArray(children.props) ||
      !("children" in children.props) ||
      typeof children.props.children !== "string"
    ) {
      showChildError("Invalid input type.");
      return;
    }

    const uuid = crypto
      .randomUUID()
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase()
      .replace(/^(\d)/, "a$1");
    const childrenString = children.props.children;

    (async () => {
      try {
        const { svg, bindFunctions } = await mermaid.render(
          uuid,
          childrenString
        );
        element.innerHTML = svg;
        bindFunctions?.(element);
      } catch (error) {
        console.error(error);
        showChildError("Render error");
      }
    })();
  }, [children, element]);

  return (
    <div
      ref={setElement}
      className="flex justify-center p-1 bg-stone-50 dark:bg-stone-900 rounded-md"
    />
  );
};
