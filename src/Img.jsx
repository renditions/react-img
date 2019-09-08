import React from 'react'
import getSizes from '@renditions/get-sizes'
import getSrcset, { sortRenditions } from '@renditions/get-srcset'

const Img = ({
  getSrc,
  renditions,
  breakpoints = [],
  autoSortBreakpoints = false,
  width = '100vw',
  ...rest
}) => {
  // create a copy of renditions array for in-place transforms
  const renditionsConfig = renditions.slice(0)

  sortRenditions(renditionsConfig)

  renditionsConfig.forEach(rendition => {
    rendition.src = getSrc(rendition)
  })

  return (
    <img
      src={getSrc(renditionsConfig[0])}
      srcSet={getSrcset(renditionsConfig)}
      sizes={getSizes({ width, breakpoints }, autoSortBreakpoints)}
      {...rest}
    />
  )
}

export default Img
