"use client"
import React, { useContext } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar"
import { MessageCircleCode } from 'lucide-react'
import Image from "next/image"
import { Button } from '../ui/button'
import WorkspaceHistory from './WorkspaceHistory'
import SideBarFooter from './SideBarFooter'
import { UserDetailContext } from '@/app/context/UserDetailsContext'
function AppSideBar() {
  const { userDetail } = useContext(UserDetailContext);
  if (!userDetail?._id) return null;
  return (
    <Sidebar>
      <SidebarHeader className='p-5'>
        <Image src={'/logo.png'} alt='log' width={30} height={30}/>
        <Button className='mt-5'><MessageCircleCode/>Start New Chat</Button>
      </SidebarHeader>
      <SidebarContent className='p-5'>
        
        <SidebarGroup>
            <WorkspaceHistory/>
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter >
        <SideBarFooter/>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSideBar;