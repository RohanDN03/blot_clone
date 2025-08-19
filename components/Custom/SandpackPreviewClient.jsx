// import { ActionContext } from '@/app/context/ActionContext';
// import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react'
// import React, { useContext, useEffect, useRef } from 'react'

// function SandpackPreviewClient() {
//     const previewRef=useRef();
//     const {sandpack} =useSandpack();
//     const {action,setAction} = useContext(ActionContext);
//     useEffect(()=>{
//         GetSandpackClient();
//     },[sandpack && action])

//     const GetSandpackClient=async()=>{
//         const client = previewRef.current?.getClient();
//         if(client){
//             console.log(client)
//             const result=await client.getCodeSandboxURL();
//             console.log(result);
//             if(action?.actionType=='deploy'){
//                 window.open('https://'+result?.sandboxId+'.csb.app/')
//             }else if(action?.actionType=='export'){
//                 window?.open(result?.editorUrl)
//             }
//         }
//     }
//   return (
//         <SandpackPreview
//                   ref={previewRef}
//                   style={{ height: "80vh", width: "100%" }}
//                   showNavigator={true}
//                 />
              
//   )
// }

// export default SandpackPreviewClient

// import { ActionContext } from '@/app/context/ActionContext';
// import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react'
// import React, { useContext, useEffect, useRef } from 'react'

// function SandpackPreviewClient() {
//     const previewRef = useRef();
//     const { sandpack } = useSandpack();
//     const { action } = useContext(ActionContext);

//     useEffect(() => {
//         GetSandpackClient();
//         // eslint-disable-next-line
//     }, [sandpack, action]);

//     const GetSandpackClient = async () => {
//         const client = previewRef.current?.getClient();
//         if (client) {
//             const result = await client.getCodeSandboxURL();
//             console.log(result);
//             if (action?.actionType === 'deploy') {
//                 // Try .csb.app first, fallback to embed/editor if not working
//                 if (result?.sandboxId) {
//                     window.open(`https://${result.sandboxId}.csb.app/`, "_blank");
//                 } else if (result?.embedUrl) {
//                     window.open(result.embedUrl, "_blank");
//                 } else if (result?.editorUrl) {
//                     window.open(result.editorUrl, "_blank");
//                 } else {
//                     alert("No valid deploy URL found.");
//                 }
//             } else if (action?.actionType === 'export') {
//                 if (result?.editorUrl) {
//                     window.open(result.editorUrl, "_blank");
//                 } else {
//                     alert("No editor URL found.");
//                 }
//             }
//         }
//     };

//     return (
//         <SandpackPreview
//             ref={previewRef}
//             style={{ height: "80vh", width: "100%" }}
//             showNavigator={true}
//         />
//     );
// }

// export default SandpackPreviewClient

import { ActionContext } from '@/app/context/ActionContext';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react'
import React, { useContext, useEffect, useRef } from 'react'

function SandpackPreviewClient() {
    const previewRef=useRef();
    const {sandpack} =useSandpack();
    const {action,setAction} = useContext(ActionContext);
    useEffect(()=>{
        GetSandpackClient();
    },[sandpack && action])

    const GetSandpackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
        const result = await client.getCodeSandboxURL();
        console.log(result);
        if (action?.actionType === 'deploy') {
            // Only use embedUrl or editorUrl for Devboxes
            if (result?.embedUrl) {
                window.open(result.embedUrl, "_blank");
            } else if (result?.editorUrl) {
                window.open(result.editorUrl, "_blank");
            } else {
                alert("No valid Codesandbox Devbox URL found.");
            }
        } else if (action?.actionType === 'export') {
            if (result?.editorUrl) {
                window.open(result.editorUrl, "_blank");
            } else {
                alert("No editor URL found.");
            }
        }
    }
};
  return (
        <SandpackPreview
                  ref={previewRef}
                  style={{ height: "80vh", width: "100%" }}
                  showNavigator={true}
                />
              
  )
}

export default SandpackPreviewClient

