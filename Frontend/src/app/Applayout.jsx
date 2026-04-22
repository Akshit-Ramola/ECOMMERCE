import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../features/Shared/Components/Nav'

const Applayout = () => {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}

export default Applayout