import NavBar from '@/components/nav-bar'
import React, { ReactNode } from 'react'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div className='h-screen w-full relative flex flex-col '>
        <NavBar />
        <div className='w-full'>{children}</div>
    </div>
  )
}

export default Layout