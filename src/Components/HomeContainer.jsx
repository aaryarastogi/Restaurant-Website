import React from 'react'
import { Link } from 'react-router-dom'
import Delivery from '../images/deliveryboy.jpg'
import HeroBg from '../images/heroBg.png'
import { heroData } from '../utils/data'


const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home" >
      <div className="py-2 flex-1 flex flex-col items-start  justify-center gap-6">
        <div className="flex items-center justify-center gap-2 px-4 py-1 bg-orange-100">
          <p
          className="text-base text-orange-500 font-semibold"
          >Bike Delivery</p>
          <div className="w-8 h-8 rounded-full bg-white overflow-hidden drop-shadow-xl">
            <img src={Delivery} className="w-full rounded-lg"alt="delivery"/>
          </div>
        </div>
        <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>
          The Fastest Delivery in{" "}<span className='text-orange-600 text-[3rem] lg:text-[5rem]'>Your City</span>
        </p>
        <p className='text-base text-textColor text-center text-justify md:text-left md: w-[80%]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis asperiores unde, ratione labore perferendis et ad odit voluptatum fuga quisquam perspiciatis. In dolor quo ut iure dolores consequuntur nihil harum.</p>
        <button type='button' className="w-full md:w-auto  md:items-start px-4 py-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg hover:shadow-lg transition-all duration-100 ease-in-out"><Link to='/soon'>Order Now</Link></button>
      </div>
      <div className="py-2 flex flex-1 items-center relative">
        <img src={HeroBg} className="h-420 w-full lg:w-auto lg:h-650 ml-auto" alt="hero bg"/>
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-4 flex-wrap'>
            {heroData && heroData.map((n)=>(
            <div key={n.id}
                className='lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg'>
                <img src={n.imageSrc} className="w-20 lg:w-40 -mt-10 lg:-mt-20 " alt="I1"/>
                <p className='text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'>{n.name}</p>
                <p className='text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3'>{n.description}</p>
                <p className="text-sm font-semibold text-headingColor"> 
                    <span className="text-xs text-red-600">$</span> {n.price}
                </p>
            </div>
            ))
            }
        </div>
      </div>
    </section>
  )
}

export default HomeContainer
