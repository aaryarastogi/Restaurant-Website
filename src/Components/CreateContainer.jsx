import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { MdAttachMoney, MdCloudUpload, MdDelete, MdDeveloperBoardOff, MdFastfood, MdFoodBank } from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { upload } from '@testing-library/user-event/dist/upload';
import { getAllFoodItems, saveItem } from '../utils/FirebaseFunctions';
import { clear } from '@testing-library/user-event/dist/clear';
import { useStateValue } from '../Context/StateProvider';
import { actionType } from '../Context/Reducer';

const CreateContainer = () => {
  const [title,setTitle]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState(null);
  const [imageAsset,setImageAsset]=useState(null);
  const [fields,setFields]=useState(false);
  const [alertStatus,setAlertStatus]=useState("danger");
  const [msg,setMsg]=useState(null);
  const [isLoading,setIsLoading]=useState(false);
  const [calories,setCalories]=useState("");
  const[{foodItems},dispatch]=useStateValue();

  const uploadImage=(e)=>{
    setIsLoading(true)
    const file=e.target.files[0]
    const storageRef=ref(storage,`Images/${Date.now()}-${file.name}`)
    const uploadTask=uploadBytesResumable(storageRef,file)
    uploadTask.on(
      "state_changed",
      (snapshot)=>{
        const uploadProgress=
                  (snapshot.bytesTransferred/snapshot.totalBytes)*100
      },
      (error)=>{
        console.log(error);
        setFields(true);
        setMsg("Error occurred while uploading Try Again!")
        setAlertStatus("danger");
        setTimeout(()=>{
          setFields(false);
          setIsLoading(false);
        },4000);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image Uploaded Succesfully")
          setAlertStatus("success")
          setTimeout(()=>{
            setFields(false);
          },4000)
        })
      }
    )
  }

  const deleteImage=()=>{
    setIsLoading(true);
    const deleteImage=ref(storage,imageAsset);
    deleteObject(deleteImage).then(()=>{
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image Deleted Succesfully")
          setAlertStatus("success")
          setTimeout(()=>{
            setFields(false);
          },4000)
    })
  }
  
  const saveDetails=()=>{
    setIsLoading(true);
    try {
      if((!imageAsset || !calories|| !price || !category || !title)){
        setFields(true);
      setMsg("Required fields must be filled!")
      setAlertStatus("danger");
      setTimeout(()=>{
        setFields(false);
        setIsLoading(false);
      },4000);
      }
      else{
        const data={
          id:`${Date.now()}`,
          imageURL:imageAsset,
          category:category,
          price:price,
          calories:calories,
          qty:1,
          title:title
        }
      saveItem(data)
      setIsLoading(false);
      clearData();
      setFields(true);
      setMsg("Image Uploaded Succesfully")
          setAlertStatus("success")
          setTimeout(()=>{
            setFields(false);
          },4000)
        }
    }
    catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error occurred while uploading Try Again!")
      setAlertStatus("danger");
      setTimeout(()=>{
        setFields(false);
        setIsLoading(false);
      },4000);
    }
    fetchData();
  }

  const clearData=()=>{
    setCalories("")
    setTitle("")
    setCategory("Select Category")
    setPrice("")
    setImageAsset(null)
  }

  const fetchData=async()=>{
    await getAllFoodItems().then((data)=>{
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }

  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <div className="w-[90%] md:w-[75%] border border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {
          fields && (
            <motion.p 
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            className={`w-full p-4 text-center rounded-lg font-semibold text-lg ${alertStatus==="danger"? "bg-red-400 text-red-600" : "bg-emerald-400 text-emerald-600"}`}>
              {msg}
            </motion.p>
          )}
          {/* For input */}
          <div className=" w-full border-b py-2 border-gray-500 flex items-center gap-2 ">
            <MdFastfood className="text-xl text-gray-700 "/>
            <input
            type="text"
            required value={title}
            placeholder="Give me a title"
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full h-full text-lg font-semibold text-gray-500 border-none bg-transparent outline-none"
            ></input>
          </div>
          {/* For selecting option */}
          <div className='w-full'>
            <select onChange={(e)=>setCategory(e.target.value)}
            className="w-full p-2 outline-none border-b-2 text-base border-gray-200 rounded-md cursor-pointer "
            >
              <option value='other' className='bg-white'>
                Select Category
              </option>
              {categories && categories.map((item)=>(
                <option
                key={item.id}
                className="outline-none text-base border-0 capitalize bg-white text-headingColor"
                value={item.urlParamName}
                >{item.name}</option>
              ))}
            </select>
          </div>
          {/* For Loader */}
          <div className="group flex items-center justify-center flex-col border-2 border-gray-300 rounded-lg w-full h-225 md:h-[420] border-dotted cursor-pointer">
            {isLoading ? <Loader/> :<>
            {!imageAsset?<>
            <label className="items-center justify-center w-full h-full flex flex-col cursor-pointer">
              <div className="items-center justify-center w-full h-full flex flex-col cursor-pointer gap-2">
                <MdCloudUpload 
                className='text-gray-500 text-3xl hover:text-gray-700'
                />
                <p className='text-gray-500 hover:text-gray-700'>Click here to upload</p>
              </div>
              <input
              type="file"
              name="upload Image"
              accept='image/*'
              onChange={uploadImage}
              className="w-0 h-0"
              ></input>
            </label>
            </>:<>
            <div className='relative h-full'>
              <img src={imageAsset} 
              alt="uploaded image"
              className='w-full h-full object-cover'
              />
              <button type="button" 
              className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
              onClick={deleteImage}
              >
                <MdDelete/>
              </button>
            </div>
            </>}
            </>}
          </div>
          {/* For Calories */}
          <div className='w-full flex flex-col md:flex-row items-center gap-3'>
              <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2 '>
                <MdFoodBank
                className='text-3xl text-gray-700'
                />
                <input
                type='text'
                required 
                value={calories}
                onChange={(e)=>setCalories(e.target.value)}
                placeholder="Calories"
                className="w-full h-full bg-transparent text-lg placeholder:text-gray-400 font-semibold border-none outline-none text-textColor"
                />
              </div>
              {/* For Price */}
              <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2 '>
                <MdAttachMoney
                className='text-3xl text-gray-700'
                />
                <input
                type='text'
                required 
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                placeholder="Price"
                className="w-full h-full bg-transparent text-lg placeholder:text-gray-400 font-semibold border-none outline-none text-textColor"
                />
              </div>
          </div>
          {/* For Button  */}
          <div className='flex items-center w-full'>
              <button
              type='button'
              className="w-full md:w-auto border-none outline-none bg-emerald-500 hover:bg-emerald-700 font-semibold text-white px-12 py-2 rounded-lg text-lg ml-0 md:ml-auto"
              onClick={saveDetails}
              >
                Save
              </button>
          </div>
      </div>
    </div>
  )
}

export default CreateContainer
