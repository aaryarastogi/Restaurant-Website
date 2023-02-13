import React, { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import NotFound from '../images/NotFound.svg'
import { motion } from 'framer-motion'
import { useStateValue } from '../Context/StateProvider'
import { actionType } from '../Context/Reducer'
const RowContainer = ({flag , data , scrollValue }) => {
  console.log(data);

  const rowContainer=useRef();
  useEffect(()=>{
    rowContainer.current.scrollLeft+=scrollValue;
  },[scrollValue]);

  const[items,setItems]=useState([])
  const[{cartItems},dispatch]=useStateValue();
  const addtoCart=()=>{
    // setItems([...cartItems , item]);
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items
    });
    localStorage.setItem("cartItems" , JSON.stringify(items))
  }
  useEffect(()=>{
    addtoCart();
  } , [items])


  return (
    <div 
    ref={rowContainer}
    className={`w-full flex gap-4 items-center ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center"} bg-rowBg my-12 scroll-smooth`}>
      {data && data.length>0 
      ? data.map((item)=>(
        <div 
        key={item.id}
        className='w-300 h-[300px] min-w-[300px] md:w-340 md:min-w-[340px] backdrop-blur-xl my-12 bg-cardOverlay rounded-lg hover:drop-shadow-lg flex flex-col justify-between items-center'>
        <div className='w-full flex items-center justify-between my-12'>
          <motion.div  whileHover={{scale:1.2}}  className='w-40 h-40 -mt-8 drop-shadow-2xl'>
          <img 
            src={item?.imageURL}
            alt="icecream"
            className='w-full h-full object-contain'
           />
          </motion.div>
            <motion.div 
            whileTap={{scale:0.75}}
            className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover: shadow-md'
            onClick={()=>setItems([...cartItems , item])}>
                <MdShoppingBasket
                className='text-white'
                />
            </motion.div>
        </div>
        <div className='w-full flex flex-col justify-end items-end'>
            <p className='mr-1 font-semibold text-base md:text-lg text-textColor'>
                {item?.title}
            </p>
            <p className='mt-1 text-gray-600 text-sm mr-1'>{item?.calories} Calories</p>
            <div className='flex items-center gap-8'>
                <p className='mr-1 font-semibold text-lg text-headingColor'>
                    <span className='text-sm text-red-500'>$</span>
                {item?.price}</p>
            </div>
        </div>
      </div>
      )) : 
      <div className='w-full flex flex-col items-center justify-center'>
        <img src={NotFound} className='h-340'/>
        <p
        className='text-xl text-headingColor font-semibold my-2'
        >Items Not Available</p>
      </div>
      }
    </div>
  )
}

export default RowContainer
