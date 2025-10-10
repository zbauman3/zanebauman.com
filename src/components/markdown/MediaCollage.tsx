"use client";

import { cloneElement, type ReactNode, useState } from "react";

import { onlyMediaChildren } from "./helpers";
import { MediaChild } from "./helpers";
import { RootPortal } from "../RootPortal";

const cancelClick = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

const closeSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const MediaItem = ({
  item,
  className,
}: {
  item: MediaChild;
  className: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // if video, force controls
  if (item.type === "video") {
    return (
      <div className={className}>
        {cloneElement(item, {
          controls: true,
        })}
      </div>
    );
  }

  const description = item.props?.title ?? item.props?.alt;

  const smallImg = (
    <div
      className={`${className} cursor-zoom-in`}
      onClick={() => setIsOpen(true)}
    >
      {cloneElement(item, { title: description })}
    </div>
  );

  const largeImg = cloneElement(item, {
    className: `max-h-full max-w-full cursor-default`,
    onClick: cancelClick,
  });

  const descriptionText = description && (
    <div
      className="p-2 rounded-md text-sm text-center bg-neutral-100/90 dark:bg-neutral-900/90 cursor-text"
      onClick={cancelClick}
    >
      {description}
    </div>
  );

  return (
    <>
      {smallImg}
      {isOpen && (
        <RootPortal className="fixed h-screen w-screen top-0 left-0 z-50 cursor-zoom-out bg-neutral-100/90 dark:bg-neutral-900/90">
          <div
            className="flex flex-col flex-nowrap justify-center items-center gap-1 h-full w-full p-4"
            onClick={() => setIsOpen(false)}
          >
            {largeImg}
            {descriptionText}
          </div>
          <button
            className="appearance-none absolute top-6 right-6 p-2 rounded-full shadow-md cursor-pointer bg-neutral-100/90 dark:bg-neutral-900/90"
            onClick={() => setIsOpen(false)}
          >
            {closeSvg}
          </button>
        </RootPortal>
      )}
    </>
  );
};

export const MediaCollage = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const filteredChildren = onlyMediaChildren(children);

  return (
    <div
      className={`flex flex-row flex-wrap justify-stretch items-start gap-2 ${className}`}
    >
      {filteredChildren.map((child, i) => (
        <MediaItem
          key={i}
          item={child}
          className="flex flex-nowrap justify-center items-center w-40 min-w-28 grow shrink"
        />
      ))}
    </div>
  );
};
