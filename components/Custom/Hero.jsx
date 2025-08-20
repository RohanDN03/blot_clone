"use client"
import { UserDetailContext } from '@/app/context/UserDetailsContext';
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import React, { useContext, useState } from 'react'
import SignInDialog from './SignInDialog';
import { MessageContext } from '@/app/context/MessageContext';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export default function Hero() {
    const [userInput,setUserInput] = useState();
    const {message,setMessage} = useContext(MessageContext);
    const {userDetail,setUserDetail} = useContext(UserDetailContext);
    const [openDialog,setOpenDialog] = useState(false);
    const CreateWorkspace=useMutation(api.workspace.CreateWorkspace);
    const router=useRouter();
    const onGenerate=async(input)=>{
        if(!userDetail?.name){
            setOpenDialog(true);
            return;
        }
        if (!userDetail?._id) {
        toast('User not loaded. Please sign in again.');
        return;
    }
        if(userDetail?.token<40){
            toast('you do not have enough token!')
            return ;
            }
        const msg={
            role:'user',
            content:input
        }
        setMessage(msg);
        const workspaceId=await CreateWorkspace({
            user:userDetail._id,
            messages:[msg]
        });
        console.log("Workspace created with ID:", workspaceId);
        router.push('/workspace/'+workspaceId);
    }



  return (
    <div className='flex flex-col items-center xl:mt-52 gap-2 '>
        <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
        <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>
        <div className='p-5 border rounded-xl max-w-xl w-full mt-3 '
            style={{backgroundColor:Lookup.CHAT_BACKGROUND}}>
            <div className='flex gap-2'>
            <textarea placeholder={Lookup.INPUT_PLACEHOLDER} 
            onChange={(event)=>setUserInput(event.target.value)}
            className='outline-none bg-transparent w-full h-32 max-h-56 resize'
            />
            {userInput && (
            <ArrowRight 
                onClick={() => onGenerate(userInput)}
                className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer'
            />
            )}
        </div>
        <div>
             <Link className='h-5 w-5'/>
        </div>
        </div>
        <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3'>
            {Lookup.SUGGESTIONS.map((suggestion,index)=>(
                <h2 
                key={index}
                onClick={()=>onGenerate(suggestion)}
                className='p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer'
                >{suggestion}</h2>
            ))}
        </div>
       <SignInDialog openDialog={openDialog} 
            closeDialog={(v)=>setOpenDialog(v)}/>
    </div>
    
  )
}