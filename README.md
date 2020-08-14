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
const renditions = [
  { width: '320' },
  { width: '768' },
  { width: '1280' }
]
```

Define a `getSrc` function that returns the source URL for a given rendition:

```jsx
const getSrc = (filename, ext, rendition) => {
  return `/images/${filename}_${rendition.width}.${ext}`
}
```

Define your `Image` component:

```jsx
const Image = ({ filename, ext, alt, ...rest }) => (
  <Img
    renditions={renditions}
    getSrc={getSrc.bind(null, filename, ext)}
    alt={alt}
    {...rest}
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
  srcset="/images/oranges_320.jpg 320w, /images/oranges_768.jpg 768w, /images/oranges_1280.jpg 1280w"
  alt="Oranges in a bowl."
>
```

### Sizes

By default, the `sizes` attribute is omitted. Not specifying this attribute can lead to the browser loading unnecessarily large images.

Read more about the [sizes attribute here](https://devdocs.io/html/element/img).

To render the `sizes` attribute you can provide `size` and `breakpoints` props. Here's an example using the `size` prop only:

JSX:

```html
<Image filename="oranges" ext="jpg" size="50vw" alt="Oranges in a bowl.">
```

HTML:

```html
<img
  src="/images/oranges_320.jpg"
  srcset="/images/oranges_320.jpg 320w, /images/oranges_768.jpg 768w, /images/oranges_1280.jpg 1280w"
  sizes="50vw"
  alt="Oranges in a bowl."
>
```

### Breakpoints

To specify different sizes for different viewport widths, you can provide a `breakpoints` prop.

JSX:

```jsx
<Image
  filename="oranges"
  ext="jpg"
  size="100vw"
  breakpoints={[
    {
      mediaMinWidth: '960px',
      size: '100vw'
    },
    {
      mediaMinWidth: '480px',
      size: '50vw'
    }
  ]}
  alt="Oranges in a bowl.">
```

HTML:

```html
<img
  src="/images/oranges_320.jpg"
  srcset="/images/oranges_320.jpg 320w, /images/oranges_768.jpg 768w, /images/oranges_1280.jpg 1280w"
  sizes="(min-width: 960px) 100vw, (min-width: 480px) 50vw, 100vw"
  alt="Oranges in a bowl."
>
```

### Sort Order

The `breakpoints` prop is expected to be an array sorted by `mediaMinWidth` in _descending_ order. Likewise, the `renditions` prop is expected to be an array sorted by `width` in _ascending_ order.

To sort these automatically, you can set the `autoSortBreakpoints` and `autoSortRenditions` boolean props.

## See Also

* [@renditions/react-picture-source](https://github.com/renditions/react-picture-source)
* [@renditions/get-sizes](https://github.com/renditions/get-sizes)
* [@renditions/get-srcset](https://github.com/renditions/get-srcset)
