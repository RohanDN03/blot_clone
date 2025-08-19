import ChatView from '@/components/Custom/ChatView'
import CodeView from '@/components/Custom/CodeView'
import React from 'react'

export default function Workspace() {
  return (
    <div className=" p-3 pr-5 mt-3">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
        <section className="md:col-span-4">
          <ChatView />
        </section>
        <section className="md:col-span-8">
          <CodeView />
        </section>
      </div>
    </div>
  );
}

import Hero from "@/components/Custom/Hero";