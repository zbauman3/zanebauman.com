/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ClassAttributes, HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";

import { MediaCollage } from "./MediaCollage";

// too crazy to infer from react-markdown types. Hard-coding for now.
type MarkdownWrapperProps = ClassAttributes<HTMLElement> &
  HTMLAttributes<HTMLElement> &
  ExtraProps;

type Node = NonNullable<MarkdownWrapperProps["node"]>;

const customComponents: {
  matcher: (node: Node) => boolean;
  component: React.ComponentType<any>;
}[] = [
  {
    matcher: (node) => {
      // for some reason, these are converted to camelCase?
      const customComponentName = node.properties["dataComponent"];
      return customComponentName === "MediaCollage" && node.tagName === "div";
    },
    component: MediaCollage,
  },
];

// Lost of type casting here because react-markdown types are not great
export const MarkdownWrapper = ({ node, ...props }: MarkdownWrapperProps) => {
  if (!node) {
    throw new Error("No 'node' provided to MarkdownWrapper");
  }

  const found = customComponents.find(({ matcher }) => matcher(node));
  if (!found) {
    return <node.tagName {...props} />;
  }

  return <found.component {...props} />;
};

export const markdownComponents = {
  div: MarkdownWrapper,
} as const;
