# @renditions/react-img

[![npm version](https://img.shields.io/npm/v/@renditions/react-img.svg?style=flat-square)](https://www.npmjs.com/package/@renditions/react-img) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

Responsive image component for React with nice abstractions over srcset, sizes and src attributes.

## Install

```sh
npm install @renditions/react-img
```

## Example Usage

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
