/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ClassAttributes, HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";

import { MediaCollage } from "./MediaCollage";
import { GithubEmbed } from "./GithubEmbed";
import { MermaidRenderer } from "./MermaidRenderer";

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
  {
    matcher: (node) => {
      const customComponentName = node.properties["dataComponent"];
      return customComponentName === "GithubEmbed" && node.tagName === "div";
    },
    component: GithubEmbed,
  },
  {
    matcher: (node) => {
      // pre > code.language-mermaid
      if (
        node.tagName !== "pre" ||
        node.children.length !== 1 ||
        node.children[0].type !== "element" ||
        node.children[0].tagName !== "code"
      ) {
        return false;
      }

      let className = node.children[0].properties["className"];
      if (typeof className !== "string" && !Array.isArray(className)) {
        return false;
      }

      if (!Array.isArray(className)) {
        className = [className];
      }

      return className.includes("language-mermaid");
    },
    component: MermaidRenderer,
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
  pre: MarkdownWrapper,
} as const;
