import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import LayoutMain from '../Layouts/LayoutMain'
import Menu from '../Pages/Menu'


export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <Navigate to="/menu/home" replace/>,
        }, 
        {
            path: "/menu",
            element: <LayoutMain/>,
            children: [
                { path: "home", element: <Menu /> },
            ],
        },
        // { path: "*", element: <DynamicPage /> }
    ])
}