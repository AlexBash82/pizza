import React from 'react'
import ContentLoader from 'react-content-loader'

export const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={1}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="128" r="120" />
    <rect x="0" y="269" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="88" />
    <rect x="126" y="420" rx="22" ry="22" width="150" height="45" />
    <rect x="0" y="430" rx="6" ry="6" width="90" height="27" />
  </ContentLoader>
)
