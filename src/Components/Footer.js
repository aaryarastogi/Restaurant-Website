import React from 'react'
import {FaLinkedin, FaInstagram, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import spicy from '../images/spicydeli.png'

const Footer = () => {
  return (
    <div className='w-full md:h-72 h-auto bg-orange-500' id='footer'>
        <div className='flex md:flex-row flex-col justify-evenly gap-7 md:mt-10'>
      <img src={spicy} className='md:w-64 md:h-20 md:pr-14 pl-8 md:my-9 mt-14 w-36 h-10 md:justify-start'></img>
      <ul className='flex flex-col md:gap-2 gap-2 md:items-center md:justify-center items-start justify-start ml-8 md:ml-4'>
        <li className='text-white hover:text-textColor cursor-pointe  md:text-md text-base'>Spicy Deli</li>
        <li className='text-white hover:text-textColor cursor-pointer md:text-md  text-base'>8273537557</li>
        <li className='text-white hover:text-textColor cursor-pointer md:text-md text-base'>spicydeli09@gmail.com</li>
      </ul>
      <div className='flex flex-row gap-4 md:justify-end md:ml-10 justify-start md:pl-0 pl-8 mr-10 cursor-pointer md:my-10 my-4'>
        <a href='https://www.linkedin.com/in/aarya-rastogi-512180223/' target={"_blank"} className='text-white md:text-2xl text-xl hover:text-[#0077b5]'><FaLinkedin/></a>
        <a href='https://www.instagram.com/aaryarastogi10/' target={"_blank"}  className='text-white md:text-2xl text-xl hover:text-[#e95950]'><FaInstagram/></a>
        <a href='https://twitter.com/aarya_rastogi' target={"_blank"} className="text-white md:text-2xl text-xl hover:text-[#00acee]"><FaTwitter/></a>
        <a href='https://github.com/aaryarastogi' target={"_blank"} className="text-white md:text-2xl text-xl cursor-pointer hover:text-gray-400"><FaGithub/></a>
      </div>
      </div>
      <div className='items-center justify-center md:mx-10 md:mt-0 mt-4 h-[0.32px] bg-[#959595]'></div>
      <h1 className='md:mt-14 mt-6 md:my-0 md:text-md text-sm text-textColor text-center'>Copyright © 2023. Made By Aarya Rastogi</h1>
    </div>
  )
}

export default Footer
