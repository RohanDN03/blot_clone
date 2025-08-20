"use client";
import { MessageContext } from "@/app/context/MessageContext";
import { UserDetailContext } from "@/app/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import SandpackPreviewClient from "./SandpackPreviewClient";
import { ActionContext } from "@/app/context/ActionContext";

//  Token counter utility
export const countToken = (inputText) => {
  return inputText.trim().split(/\s+/).filter(word => word).length;
};

function CodeView() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { message } = useContext(MessageContext);
  const convex = useConvex();
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const fixTokens = useMutation(api.users.fixUserTokens);
  const UpdateTokens=useMutation(api.users.UpdateToken);
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const {action,setAction}=useContext(ActionContext);
  // shared normalize function
  const normalizeFiles = (files) => {
    const normalized = {};

    for (const [path, file] of Object.entries(files || {})) {
      if (path === "/App.js") {
        normalized["/src/App.js"] = file;
      } else if (path === "/index.js") {
        normalized["/src/index.js"] = file;
      } else {
        normalized[path] = file;
      }
    }

    // remove any stray root-level files
    delete normalized["/App.js"];
    delete normalized["/index.js"];

    return normalized;
  };

  //  Fetch files from Convex
  useEffect(() => {
    id && GetFiles();
  }, [id]);
  useEffect(()=>{
    setActiveTab('preview');
  },[action])

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });

    const normalizedFiles = normalizeFiles(result.files);

    let mergedFiles;
    if (normalizedFiles["/package.json"]) {
      mergedFiles = normalizedFiles;
     } 
    //  else {
    //   mergedFiles = { ...Lookup.DEFAULT_FILE, ...normalizedFiles };
    // }

    setFiles(mergedFiles);
    setLoading(false);
  };

  //  React to new chat messages
  useEffect(() => {
    if (message?.length > 0) {
      const lastMsg = message[message.length - 1];
      if (lastMsg.role === "user") {
        console.log("Generating AI code...");
        generateAiCode(lastMsg.content);
      }
    }
  }, [message]);

  //  Generate AI code
  const generateAiCode = async (userPrompt) => {
    setLoading(true);
    setError(null);

    try {
      const PROMPT = userPrompt + " " + Prompt.CODE_GEN_PROMPT;
      const response = await axios.post("/api/gen-ai-code", { prompt: PROMPT });

      console.log("AI Code Result:", response.data);

      const result = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      if (!result?.files) {
        setError("AI did not return any files");
        setLoading(false);
        return;
      }

      const normalizedFiles = normalizeFiles(result.files);

      let mergedFiles;
      if (normalizedFiles["/package.json"]) {
        mergedFiles = normalizedFiles;
      } 
      // else {
      //   mergedFiles = { ...Lookup.DEFAULT_FILE, ...normalizedFiles };
      // }

      setFiles(mergedFiles);

      // save back to convex
      await UpdateFiles({
        workspaceId: id,
        files: normalizedFiles,
      });
       const currentToken = isNaN(Number(userDetail?.token))
                  ? 50000
                  : Number(userDetail?.token);
      
                const newToken = Math.max(0, currentToken - countToken(JSON.stringify(result)));
      
                await UpdateTokens({
                  userId: userDetail?._id,
                  token: newToken
              });
                setUserDetail(prev=>({
                  ...prev,
                  token:newToken
                }))
          async function handleFix() {
              const result = await fixTokens();
              console.log(result); // "Fixed NaN/missing tokens"
            }
      setActiveTab('code')

      setLoading(false);
    } catch (err) {
      console.error("Error calling gen-ai-code:", err);
      setError(err.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Top bar with Code / Preview tabs */}
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 justify-center w-[140px] gap-3 rounded-full">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer transition-colors ${
              activeTab === "code" ? "text-blue-500" : "text-white"
            }`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer transition-colors ${
              activeTab === "preview" ? "text-blue-500" : "text-white"
            }`}
          >
            Preview
          </h2>
        </div>
      </div>

      <SandpackProvider
        files={files}
        template="react"
        theme="dark"
        customSetup={{ dependencies: { ...Lookup.DEPENDANCIES } }}
        options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
      >
        <SandpackLayout>
          {activeTab === "code"?<>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
          </>:
            <>
              <SandpackPreviewClient/>
            </>}
          
        </SandpackLayout>
      </SandpackProvider>

      {loading && (
        <div className="p-10 bg-gray-900 opacity-80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Generating your files...</h2>
        </div>
      )}
    </div>
  );
}

export default CodeView;