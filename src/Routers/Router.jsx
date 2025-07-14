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
        // {
        //     path: "/login",
        //     element: <Login/>,
        // }, 
        // {
        //     path: "/link",
        //     element: <AdminLayout/>,
        //     children: [
        //         { path: "linkmanagement", element: <LinkManagement/> },
        //         { path: "history", element: <History /> },
        //         { path: "detailLink", element: <DetailLink/> },
        //         // { path: "notfound", element: <PageNotFound/> },
        //         { path: "*", element: <Navigate to="/page/notfound" /> }
        //     ],
        // },
        // {
        //     path: "/statistic",
        //     element: <Statistic/>,
        // },
        // { path: "*", element: <DynamicPage /> }
    ])
}