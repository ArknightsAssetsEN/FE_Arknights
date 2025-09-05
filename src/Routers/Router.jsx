import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Home from '../Pages/Home'
import LayoutMain from '../Layouts/LayoutMain'
import Character from '../Pages/Character'
import Menu from '../Pages/Menu'


export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <Navigate to="/menu"/>,
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
                { path: "home", element: <Character /> },
            ],
        },
        {
            path: "/gacha",
            element: <LayoutMain/>,
            children: [
                { path: "home", element: <Home /> },
            ],
        },
        {
            path: "/view",
            element: <Character/>,
        },
        {
            path: "/menu",
            element: <Menu/>,
        },
        // { path: "*", element: <DynamicPage /> }
    ])
}