import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import { ArknightsProvider } from '../Contexts/Context'

export default function LayoutMain() {
  return (
    //  bg-gradient-to-b from-white to-blue-200
    <div className='flex flex-col min-h-screen'>
      <ArknightsProvider>
        <Header/>
        

        <div className='flex-grow'>
          <Outlet/>
        </div>
      </ArknightsProvider>
    </div>
  )
}