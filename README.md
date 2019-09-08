# @renditions/react-img

[![npm version](https://img.shields.io/npm/v/@renditions/react-img.svg?style=flat-square)](https://www.npmjs.com/package/@renditions/react-img) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

Responsive image component for React with nice abstractions over srcset, sizes and src attributes.

## Install

```sh
npm install @renditions/react-img
```

## Usage

Import `react` and `@renditions/react-img`:

```jsx
import React from 'react'
import Img from '@renditions/react-img'
```

Define a renditions configuration:

```jsx
const renditionWidths = ['320', '768', '1280']
const renditions = renditionWidths.map(width => ({ width }))
```

Define a `getSrc` function that returns the source URL for a given rendition:

```jsx
const getSrc = (filename, ext, rendition) => {
  return `/images/${filename}_${rendition.width}.${ext}`
}
```

Define your `Image` component:

```jsx
const Image = ({ filename, ext, alt }) => (
  <Img
    getSrc={getSrc.bind(null, filename, ext)}
    renditions={renditions}
    alt={alt}
  >
)
```

Here's what this component renders to the DOM:

JSX:

```html
<Image filename="oranges" ext="jpg" alt="Oranges in a bowl.">
```

HTML:

```html
<img
  src="/images/oranges_320.jpg"
  srcset="/images/oranges_320.jpg 320w,/images/oranges_768.jpg 768w,/images/oranges_1280.jpg 1280w"
  sizes="100vw"
  alt="Oranges in a bowl."
>
```

### Sizes

The `sizes` attribute defaults to a value of `100vw`. Read more about the [sizes attribute here](https://devdocs.io/html/element/img).

To change the `sizes` attribute you can provide a `width` prop.

```jsx
const Image = ({ filename, ext, alt, width = '100vw' }) => (
  <Img
    getSrc={getSrc.bind(null, filename, ext)}
    renditions={renditions}
    width={width}
    alt={alt}
  >
)
```

Here's what this component renders to the DOM:

JSX:

```html
<Image filename="oranges" ext="jpg" width="50vw" alt="Oranges in a bowl.">
```

HTML:

```html
<img
  src="/images/oranges_320.jpg"
  srcset="/images/oranges_320.jpg 320w,/images/oranges_768.jpg 768w,/images/oranges_1280.jpg 1280w"
  sizes="50vw"
  alt="Oranges in a bowl."
>
```

### Breakpoints

To specify different `sizes` for different viewport widths, you can provide a `breakpoints` prop.

JSX:

```html
<Image
  filename="oranges"
  ext="jpg"
  width="100vw"
  breakpoints={[
    {
      mediaMinWidth: '960px',
      width: '100vw'
    },
    {
      mediaMinWidth: '480px',
      width: '50vw'
    }
  ]}
  alt="Oranges in a bowl.">
```

HTML:

```html
<img
  src="/images/oranges_320.jpg"
  srcset="/images/oranges_320.jpg 320w,/images/oranges_768.jpg 768w,/images/oranges_1280.jpg 1280w"
  sizes="(min-width: 960px) 100vw,(min-width: 480px) 50vw,50vw"
  alt="Oranges in a bowl."
>
```

### Sort Order

The `breakpoints` prop is expected to be an array sorted by `mediaMinWidth` in _descending_ order. For example:

To sort these automatically, you can set the `autoSortBreakpoints` boolean prop.

Note: the `renditions` will always be sorted automatically by `width` in _ascending_ order.
