import React from 'react'

const SelectOption = ({icon}) => {
  return (
    <div className='w-10 h-10 bg-white rounded-full border shadow-md flex 
    items-center justify-center hover:bg-gray-900 hover:text-white cursor-pointer
    hover:border-gray-900
    '>
      {icon}
    </div>
  )
}

export default SelectOption