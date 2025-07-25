import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Home from '../Pages/Home'
import LayoutMain from '../Layouts/LayoutMain'


export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <Navigate to="/map/home"/>,
        }, 
        {
            path: "/map",
            element: <LayoutMain/>,
            children: [
                { path: "home", element: <Home /> },
            ],
        },
        {
            path: "/recruiment",
            element: <LayoutMain/>,
            children: [
                { path: "home", element: <Home /> },
            ],
        },
        {
            path: "/gacha",
            element: <LayoutMain/>,
            children: [
                { path: "home", element: <Home /> },
            ],
        },
  
        // { path: "*", element: <DynamicPage /> }
    ])
}