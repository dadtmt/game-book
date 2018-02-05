import React from 'react'

const Page = ({ id, description, imageUrl, title }) => (
  <div>
    <h2>{title}</h2>
    {imageUrl && (
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          paddingBottom: '100%'
        }}
      />
    )}
    <div>{description}&nbsp;</div>
  </div>
)

export default Page
