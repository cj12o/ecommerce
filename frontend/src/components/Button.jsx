import React from 'react'

function Button({
    children,
    type='button',
    className='',
    ...props
}) {
  return (
    <button {...props} className={`rounded p-2 bg-blue-700 text-white shadow-md hover:shadow-lg hover:shadow-gray-800/90 transition duration-200  active:bg-blue-900 ${className}`} type={type}>{children}</button>
  )
}

export default Button

