"use client";

import { useState, useEffect, useRef } from "react";
import mermaid from "mermaid";
import elkLayouts from "@mermaid-js/layout-elk";

export const MermaidRenderer = ({ children }: { children: unknown }) => {
  const [element, setElement] = useState<null | HTMLDivElement>(null);
  const hasLoadedElkRef = useRef(false);

  useEffect(() => {
    if (!element) {
      return;
    }

    const showChildError = (type: string) => {
      element.innerHTML = `<span style="color: red;">Error rendering Mermaid diagram: ${type}</span>`;
    };

    // validate the children to find the `code > string` structure
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

    const childrenString = children.props.children;

    (async () => {
      try {
        // needs an ID, so we generate a random one
        const uuid = crypto
          .randomUUID()
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase()
          .replace(/^(\d)/, "a$1");

        if (!hasLoadedElkRef.current) {
          // Fix a bug with mermaid block diagrams in react. ☹️
          // https://github.com/facebook/react/issues/24360
          // https://github.com/mermaid-js/mermaid/issues/5530
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (HTMLElement.prototype as any).toJSON = () => "";
          mermaid.registerLayoutLoaders([...elkLayouts]);
          hasLoadedElkRef.current = true;
        }

        // if there's no config, add a default one
        const { config } = await mermaid.parse(childrenString);
        let stringWithConfig = childrenString;
        if (Object.keys(config).length === 0) {
          stringWithConfig =
            `---\nconfig:\n  theme: dark\n  layout: elk\n---\n` +
            childrenString;
        }

        const { svg, bindFunctions } = await mermaid.render(
          uuid,
          stringWithConfig
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
    >
      Loading Mermaid diagram...
    </div>
  );
};
