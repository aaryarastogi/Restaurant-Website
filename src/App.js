import React, { useEffect } from 'react'
import { Route , Routes } from 'react-router-dom'
import { Header } from './Components'
import CreateContainer from './Components/CreateContainer'
import MainContainer from './Components/MainContainer'
import { AnimatePresence , exitBeforeEnter } from 'framer-motion'
import { useStateValue } from './Context/StateProvider'
import { getAllFoodItems } from './utils/FirebaseFunctions'
import { actionType } from './Context/Reducer'
import Terms from './Components/Terms.js'
import Soon from './Components/Soon.js'
import Footer from './Components/Footer'


const App = () => {
  const[{foodItems},dispatch]=useStateValue();
  const fetchData=async()=>{
    await getAllFoodItems().then((data)=>{
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }

  useEffect(()=>{
    fetchData();
  },[]);

  return (
    <AnimatePresence>
    <div className="w-screen h-auto flex flex-col bg-primary">
      <Header/>
      <main className="mt-14 md:mt-20 w-full px-4 md:px-16 py-4">
        <Routes>
          <Route path="/*" element={<MainContainer/>}/>
          <Route path="/createItem" element={<CreateContainer/>}/>
          <Route path='/termsofuse' element={<Terms/>}/>
          <Route path='/soon' element={<Soon/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
    </AnimatePresence>
  )
}

export default App
