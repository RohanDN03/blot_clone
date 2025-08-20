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

