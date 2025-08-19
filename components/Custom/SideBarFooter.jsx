import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { UserDetailContext } from '@/app/context/UserDetailsContext';

function SideBarFooter() {
    const router=useRouter();
    const { setUserDetail } = useContext(UserDetailContext);
    const Options=[
        {
            name:"setting",
            icon:Settings
        },
         {
            name:"Help Center",
            icon:HelpCircle
        },
         {
            name:"My Subscription",
            icon:Wallet,
            path:'/pricing'
        },
         {
            name:"Sign Out",
            icon:LogOut,
            action: "signout",
        }
    ]
    
  const onOptionClick = (option) => {
    if (option?.path) {
      router.push(option.path);
    } else if (option?.action === "signout") {
      // ✅ Clear local storage
      localStorage.removeItem("user");

      // ✅ Reset context
      setUserDetail(null);

      // ✅ Redirect to home/login
      router.push("/");
    }
  };
  return (
    <div className='p-2 mb-10'>
        {Options.map((option,index)=>(
            
            <Button variant="ghost" 
                onClick={()=>onOptionClick(option)}
                className="w-full flex justify-start my-3" key={index} >
                <option.icon/>
                {option.name}
            </Button>
        ))}
    </div>
  )
}

export default SideBarFooter 
