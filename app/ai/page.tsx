import React from 'react'
import AI from '../components/AI'
import MobAI from '../components/MobAI'
const page = () => {
  return (
    <div className='h-full w-full'>
    <div className='hidden md:block'>
  <AI />
    </div>
    <div className='md:hidden block'>
      <MobAI />
    </div>
    </div>
  )
}

export default page
