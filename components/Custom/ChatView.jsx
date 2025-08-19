// "use client";
// import { MessageContext } from '@/app/context/MessageContext';
// import { UserDetailContext } from '@/app/context/UserDetailsContext';
// import { api } from '@/convex/_generated/api';
// import Colors from '@/data/Colors';
// import Lookup from '@/data/Lookup';
// import Prompt from '@/data/Prompt';
// import axios from 'axios';
// import { useConvex } from 'convex/react';
// import { ArrowRight, Link, Loader2Icon } from 'lucide-react';
// import Image from 'next/image';
// import { useParams } from 'next/navigation';
// import React, { useContext, useEffect, useState } from 'react';

// function ChatView() {
//   const { id } = useParams();
//   const convex = useConvex();
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);
//   const { message, setMessage } = useContext(MessageContext);
//   const [loading, setLoading] = useState(false);
//     const [userInput, setUserInput] = useState('');
//   useEffect(() => {
//     id && GetWorkspaceData();
//   }, [id]);

//   const GetWorkspaceData = async () => {
//     const result = await convex.query(api.workspace.GetWorkspace, {
//       workspaceId: id
//     });
//     setMessage(result?.messages);
//     console.log("Workspace Data:", result);
//   };

//   useEffect(()=>{
//     if(message?.length>0){
//         const role=message[message.length-1].role;
//         if(role==='user'){
//             GetAiResponse();
//         }
//     }
//   })

//   const GetAiResponse=async()=>{
//     setLoading(true);
//     const PROMPT=JSON.stringify(message)+Prompt.CHAT_PROMPT;
//     const result = await axios.post('/api/ai-chat',{
//         prompt:PROMPT,
//     });
//     console.log(result.data.result);
//     setMessage(prev=>[...prev,{
//         role:'ai',
//         content:result.data.result
//     }])
//     setLoading(false);
//   }

//   return (
//     <div className='relative h-[85vh] flex flex-col'>
//       <div className='flex-1 overflow-scroll'>
//         {message?.map((msg, index) => (
//           <div
//             key={index}
//             className="p-3 rounded-lg mb-2 flex gap-2 items-center"
//             style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
//           >
//             <Image
//               src={msg.picture || userDetail?.picture || "/default-avatar.png"}
//               alt={`${msg.username || 'user'} avatar`}
//               width={35}
//               height={35}
//               className="rounded-full"
//             />
//             <h2>{msg.content}</h2>
//           </div>
//         ))}
//          {loading &&<div className='p-3 rounded-lg mb-2 flex gap-2 items-center'
//             style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
//                 <Loader2Icon className='animate-spin'/>
//                 <h2>Generating response...</h2>
//             </div>
//             }
//       </div>
//         {/* Input Section */}
//          <div className='p-5 border rounded-xl max-w-xl w-full mt-3 '
//             style={{backgroundColor:Lookup.CHAT_BACKGROUND}}>
//             <div className='flex gap-2'>
//                 <textarea placeholder={Lookup.INPUT_PLACEHOLDER} 
//                 onChange={(event)=>setUserInput(event.target.value)}
//                 className='outline-none bg-transparent w-full h-32 max-h-56 resize'
//             />
//                 {userInput &&<ArrowRight 
//                     onClick={()=>onGenerate(userInput)}
//                     className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer'/>}
//             </div>
//             <div>
//                 <Link className='h-5 w-5'/>
//             </div>
//         </div>

//     </div>
//   );
// }

// export default ChatView;

// -----------------------------------------------





// "use client";
// import { MessageContext } from '@/app/context/MessageContext';
// import { UserDetailContext } from '@/app/context/UserDetailsContext';
// import { api } from '@/convex/_generated/api';
// import Colors from '@/data/Colors';
// import Lookup from '@/data/Lookup';
// import Prompt from '@/data/Prompt';
// import axios from 'axios';
// import { useConvex } from 'convex/react';
// import { ArrowRight, Link, Loader2Icon } from 'lucide-react';
// import Image from 'next/image';
// import { useParams } from 'next/navigation';
// import React, { useContext, useEffect, useState } from 'react';

// function ChatView() {
//   const { id } = useParams();
//   const convex = useConvex();
//   const { userDetail } = useContext(UserDetailContext);
//   const { message, setMessage } = useContext(MessageContext);
//   const [loading, setLoading] = useState(false);
//   const [userInput, setUserInput] = useState('');

//   useEffect(() => {
//     if (id) GetWorkspaceData();
//   }, [id]);

//   const GetWorkspaceData = async () => {
//     const result = await convex.query(api.workspace.GetWorkspace, {
//       workspaceId: id
//     });

//     // Ensure message is always an array
//     const messages = Array.isArray(result?.messages) ? result.messages : [];
//     setMessage(messages);

//     console.log("Workspace Data:", messages);
//   };

//   useEffect(() => {
//     if (Array.isArray(message) && message.length > 0) {
//       const role = message[message.length - 1].role;
//       if (role === 'user') {
//         GetAiResponse();
//       }
//     }
//   }, [message]);

//   const GetAiResponse = async () => {
//     try {
//       setLoading(true);
//       const PROMPT = JSON.stringify(message) + Prompt.CHAT_PROMPT;

//       const response = await axios.post('/api/ai-chat', {
//         prompt: PROMPT,
//       });

//       // Log the full raw response from API before extracting
//       console.log("Full AI Raw Response:", response.data);

//       const aiText = response.data?.result || "⚠️ No AI output received";

//       setMessage(prev => [
//         ...(Array.isArray(prev) ? prev : []),
//         {
//           role: 'ai',
//           content: aiText
//         }
//       ]);
//     } catch (err) {
//       console.error("Error getting AI response:", err);
//       setMessage(prev => [
//         ...(Array.isArray(prev) ? prev : []),
//         {
//           role: 'ai',
//           content: "⚠️ Error occurred while getting AI response."
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onGenerate = (input) => {
//     setMessage(prev => [
//       ...(Array.isArray(prev) ? prev : []),
//       {
//         role: 'user',
//         content: input,
//         picture: userDetail?.picture || "/default-avatar.png",
//         username: userDetail?.name || "User"
//       }
//     ]);
//     setUserInput('');
//   };

//   return (
//     <div className='relative h-[85vh] flex flex-col'>
//       <div className='flex-1 overflow-scroll'>
//         {Array.isArray(message) && message.map((msg, index) => (
//           <div
//             key={index}
//             className="p-3 rounded-lg mb-2 flex gap-2 items-center"
//             style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
//           >
//             <Image
//               src={msg.picture || userDetail?.picture || "/default-avatar.png"}
//               alt={`${msg.username || 'user'} avatar`}
//               width={35}
//               height={35}
//               className="rounded-full"
//             />
//             <h2>{msg.content}</h2>
//           </div>
//         ))}
//         {loading && (
//           <div
//             className='p-3 rounded-lg mb-2 flex gap-2 items-center'
//             style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
//           >
//             <Loader2Icon className='animate-spin' />
//             <h2>Generating response...</h2>
//           </div>
//         )}
//       </div>

//       {/* Input Section */}
//       <div className='p-5 border rounded-xl max-w-xl w-full mt-3'
//         style={{ backgroundColor: Lookup.CHAT_BACKGROUND }}>
//         <div className='flex gap-2'>
//           <textarea
//             placeholder={Lookup.INPUT_PLACEHOLDER}
//             value={userInput}
//             onChange={(event) => setUserInput(event.target.value)}
//             className='outline-none bg-transparent w-full h-32 max-h-56 resize'
//           />
//           {userInput && (
//             <ArrowRight
//               onClick={() => onGenerate(userInput)}
//               className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer'
//             />
//           )}
//         </div>
//         <div>
//           <Link className='h-5 w-5' />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatView;


"use client";
import { MessageContext } from '@/app/context/MessageContext';
import { UserDetailContext } from '@/app/context/UserDetailsContext';
import { api } from '@/convex/_generated/api';
import Colors from '@/data/Colors';
import Prompt from '@/data/Prompt';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { ArrowRight, Link, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSidebar } from '../ui/sidebar';

export const countToken=(inputText)=>{
  return inputText.trim().split(/\s+/).filter(word=>word).length;
}
function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail,setUserDetail} = useContext(UserDetailContext);
  const { message, setMessage } = useContext(MessageContext);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const {toggleSidebar} =useSidebar();
  const UpdateTokens=useMutation(api.users.UpdateToken);
  const fixTokens = useMutation(api.users.fixUserTokens);

  useEffect(() => {
    if (id) {
      GetWorkspaceData();
    }
  }, [id]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, { workspaceId: id });
    console.log("Workspace Data raw:", result);

    if (Array.isArray(result?.messages)) {
      setMessage(result.messages);
    } else if (result?.messages) {
      setMessage([result.messages]);
    } else {
      setMessage([]);
    }
  };

//   useEffect(() => {
//     if (Array.isArray(message) && message.length > 0) {
//       const role = message[message.length - 1]?.role;
//       if (role === 'user') {
//         GetAiResponse();
//       }
//     }
//   }, [message]);

useEffect(()=>{
        if(message?.length>0){
            const role=message[message?.length-1].role;
            if(role=='user'){
               GetAiResponse()
            }
        }
    },[message])
  const GetAiResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(message) + Prompt.CHAT_PROMPT;

    try {
      // Only call ai-chat now
      const chatRes = await axios.post('/api/ai-chat', { prompt: PROMPT });
       

      const aiMsg =
        chatRes.data?.cleanedText ||
        chatRes.data?.result ||
        chatRes.data?.text ||
        (typeof chatRes.data === "string" ? chatRes.data : null);

      const content =
        typeof aiMsg === "string" && aiMsg.trim() !== ""
          ? aiMsg
          : JSON.stringify(chatRes.data);

      setMessage(prev => [
        ...(Array.isArray(prev) ? prev : []),
        { role: "ai", content }
      ]);

      
      
      await UpdateMessages({
        workspaceId: id,
        messages: [...message, { role: "ai", content }],
      });
      // const token=Number(userDetail?.token)-Number(countToken(JSON.stringify(aiMsg)));
      // // update token in database
      // await UpdateTokens({
      //   userId:userDetail?._id,
      //   token:token
      // })
      const currentToken = isNaN(Number(userDetail?.token))
            ? 50000
            : Number(userDetail?.token);

          const newToken = Math.max(0, currentToken - countToken(JSON.stringify(aiMsg)));
          setUserDetail(prev=>({
            ...prev,
            token:newToken
          }))
          await UpdateTokens({
            userId: userDetail?._id,
            token: newToken
        });
        

async function handleFix() {
  const result = await fixTokens();
  console.log(result); // "Fixed NaN/missing tokens"
}
      setLoading(false);

    } catch (err) {
      console.error("AI fetch error:", err);
      setMessage(prev => [
        ...(Array.isArray(prev) ? prev : []),
        { role: "ai", content: "⚠ Error generating response." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onGenerate = (text) => {
    if(userDetail?.token<40){
      toast('you do not have enough token!')
      return ;
    }
    setMessage(prev => [
      ...(Array.isArray(prev) ? prev : []),
      { role: 'user', content: text, picture: userDetail?.picture }
    ]);
    setUserInput('');
  };

  return (
    <div className='relative h-[85vh] flex flex-col'>
      <div className='flex-1 overflow-scroll scrollbar-hide px-5'>
        {Array.isArray(message) && message.length > 0 ? (
          message.map((msg, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex gap-2 items-center"
              style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
            >
              <Image
                src={msg.picture || userDetail?.picture || "/default-avatar.png"}
                alt={`${msg.username || 'user'} avatar`}
                width={35}
                height={35}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <ReactMarkdown>
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))
        ) : (
          <p className="p-3 text-gray-500">No messages yet.</p>
        )}

        {loading && (
          <div
            className='p-3 rounded-lg mb-2 flex gap-2 items-center leading-7'
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
          >
            <Loader2Icon className='animate-spin' />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>

      {/* Input Section */}
      {/* <div className='flex gap-2 items-end'>
        {userDetail && <Image src={userDetail?.picture} alt='user' width={30} height={30}/>}
            <div
              className='p-5 border rounded-xl max-w-xl w-full mt-3'
              style={{ backgroundColor: Prompt.CHAT_BACKGROUND }}
              >
              <div className='flex gap-2'>
                <textarea
                  placeholder={Prompt.INPUT_PLACEHOLDER}
                  value={userInput}
                  onChange={(event) => setUserInput(event.target.value)}
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
                <Link className='h-5 w-5' />
              </div>
        </div>
      </div> */}
      <div className='flex gap-2 items-end mt-3'>
  {userDetail && (
    <Image
      src={userDetail?.picture || "/default-avatar.png"}
      alt='user'
      width={40}
      height={40}
      className="rounded-full object-cover cursor-pointer"
      onClick={toggleSidebar}
    />
  )}
  <div
    className='p-5 border rounded-xl max-w-xl w-full'
    style={{ backgroundColor: Prompt.CHAT_BACKGROUND }}
  >
    <div className='flex gap-2'>
      <textarea
        placeholder={Prompt.INPUT_PLACEHOLDER}
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
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
      <Link className='h-5 w-5' />
    </div>
  </div>
</div>
    </div>
  );
}

export default ChatView;