import React from 'react'
import { Link } from 'react-router-dom'

const SelectBook = ({id, description, imageUrl, title}) => <div>
  <Link to={`book/${id}`}>Select this book link</Link>
  <h2>{title}</h2>
  { imageUrl && (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        paddingBottom: '100%',
      }}
    />
  ) }
  <div>
    {description}&nbsp;
  </div>
</div>

export default SelectBook
