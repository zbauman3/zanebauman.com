import { Children, type ComponentProps, type ReactElement } from "react";

export type MediaChild =
  | ReactElement<ComponentProps<"img">, "img">
  | ReactElement<ComponentProps<"video">, "video">;

export const isMediaChild = (child: unknown): child is MediaChild =>
  !!child &&
  typeof child === "object" &&
  "type" in child &&
  (child.type === "img" || child.type === "video");

export const onlyMediaChildren = (
  children: Parameters<typeof Children.toArray>[0]
): MediaChild[] => Children.toArray(children).filter(isMediaChild);
