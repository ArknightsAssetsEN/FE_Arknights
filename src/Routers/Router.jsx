import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Home from '../Pages/Home'

export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <Home />,
        }, 
        // {
        //     path: "/page",
        //     element: <Layout/>,
        //     children: [
        //         { path: "home", element: <Home /> },
        //         { path: "history", element: <History /> },
        //         { path: "contact", element: <ContactPage /> },
        //         { path: "about", element: <About /> },
        //         { path: "detailLink", element: <DetailLink/> },
        //         { path: "notfound", element: <PageNotFound/> },
        //         { path: "*", element: <Navigate to="/page/notfound" /> }
        //     ],
        // },
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