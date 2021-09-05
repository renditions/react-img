import * as React from "react";
import getSizes, { Breakpoint } from "@renditions/get-sizes";
import getSrcset, { sortRenditions } from "@renditions/get-srcset";

export type { Breakpoint } from "@renditions/get-sizes";
export type { Rendition } from "@renditions/get-srcset";

export type RenditionConfig = {
  width: number;
};

const Img: React.FC<
  {
    getSrc: (rendition: RenditionConfig) => string;
    renditions: RenditionConfig[];
    size: string;
    breakpoints?: Breakpoint[];
    autoSortRenditions?: boolean;
    autoSortBreakpoints?: boolean;
  } & React.ImgHTMLAttributes<HTMLImageElement>
> = ({
  getSrc,
  renditions: renditionConfigs,
  size,
  breakpoints = [],
  autoSortRenditions = false,
  autoSortBreakpoints = false,
  ...rest
}) => {
  const renditions = renditionConfigs.map((rendition) => ({
    ...rendition,
    src: getSrc(rendition),
  }));

  if (autoSortRenditions) {
    sortRenditions(renditions);
  }

  if (!renditions[0]) {
    throw new Error("Must provide at least 1 rendition.");
  }

  return (
    <img
      src={getSrc(renditions[0])}
      srcSet={getSrcset(renditions)}
      sizes={getSizes({ size, breakpoints }, autoSortBreakpoints)}
      {...rest}
    />
  );
};

export default Img;
