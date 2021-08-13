import * as React from "react";
import getSizes, { Breakpoint } from "@renditions/get-sizes";
import getSrcset, { Rendition, sortRenditions } from "@renditions/get-srcset";

export type { Breakpoint } from "@renditions/get-sizes";
export type { Rendition } from "@renditions/get-srcset";

const Img = ({
  getSrc,
  renditions,
  size,
  breakpoints = [],
  autoSortRenditions = false,
  autoSortBreakpoints = false,
  ...rest
}: {
  getSrc: (rendition: Rendition) => string;
  renditions: Rendition[];
  size: string;
  breakpoints?: Breakpoint[];
  autoSortRenditions: boolean;
  autoSortBreakpoints: boolean;
} & React.ImgHTMLAttributes<HTMLImageElement>) => {
  // create a copy of renditions array for in-place transforms
  const renditionsConfig = renditions.slice(0);

  if (autoSortRenditions) {
    sortRenditions(renditionsConfig);
  }

  renditionsConfig.forEach((rendition) => {
    rendition.src = getSrc(rendition);
  });

  if (!renditionsConfig[0]) {
    throw new Error("Must provide at least 1 rendition.");
  }

  return (
    <img
      src={getSrc(renditionsConfig[0])}
      srcSet={getSrcset(renditionsConfig)}
      sizes={getSizes({ size, breakpoints }, autoSortBreakpoints)}
      {...rest}
    />
  );
};

export default Img;
