import React from 'react'
import soon from '../images/soon.avif'
const Soon = () => {
  return (
    <div className="md:w-full h-[100vh]  ">
    <div className='flex flex-col md:flex-row w-full justify-center items-center h-screen md:gap-10 lg:gap-20'>
    <img src={soon} className='md:w-[30rem] w-64 pt-12 '></img>
      <div >
        <h1 className='text-orange-500 text-left lg:text-5xl text-[32px] md:text-3xl font-[500] drop-shadow-3xl'>WE ARE 
        <br/>
        <h1 className='text-orange-500 text-left lg:text-5xl text-[32px] md:text-3xl'>COMING SOON</h1>
        </h1>
      </div>
    </div>
    </div>
  )
}

export default Soon