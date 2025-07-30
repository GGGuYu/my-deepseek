

//route('/chat/[chat_id]')
// export default async function Page({
//   params,
// }: {
//   params: Promise<{ chat_id: string }> //找路由中的chat_id
// }) {
//   const { chat_id } = await params //接受approuter程序找到的chat_id
//   return <div>My Post: {chat_id}</div>
// }



'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import { modelType } from '@/app/component/Welcome';
import { InputArea } from '@/app/component/Welcome/InputArea';
import MessageCard from '@/app/component/Chat/MessageCard';
import { useScollIntoDiv } from '@/app/my-hooks/useScollIntoDiv';

export default function Page() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({});
    const [model , setModel] = useState<modelType>('deepseek-v3');
    // 下滑锚点
    const endRef = useScollIntoDiv([messages]);


    //handleModelChange
    const handleModelChange = () => {
        if(model === 'deepseek-v3') setModel('deepseek-r1');
        else if(model === 'deepseek-r1') setModel('deepseek-v3');
    }

  return (
    // messages and inputs layout
    <div className='flex flex-col h-screen justify-between items-center w-full'>
        {/* messages row layout */}
        <div className='w-full flex flex-col gap-[6px]'>
            {messages.map(message => (
                // this row need 1row 100% full 1 msg by 1 msg no 2msg in row
                // box layout right or left
                <div key={message.id} className={`w-full box-border p-[5px] flex flex-row ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {/* message box max-width:50% cant bigger 
                     and card layout , right or left but cant over the max*/}
                    <div className={`w-[50%] flex flex-row ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <MessageCard role={message.role} content={message.content} />
                    </div>
                </div>
            ))}
        </div>
        {/* 自动下滑用的一个dom元素,锚点 
            滑到这个元素
        */}
        <div className='h-4' ref={endRef}></div>
        {/* 输入框 */}
        <div className='w-full box-border p-[2vh]'>
            <InputArea value={input} onInputChange={handleInputChange}
                model={model}
                onModelChange={handleModelChange}
                handleSubmit={handleSubmit}
            />
        </div>
    </div>
  );
}