

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
import { useMessagesStore } from '@/app/store/messages-store';

export default function Page() {
    //这个钩子的handleSubmit会把input丢进messages中，然后发送请求到后端
    //然后根据返回信息，流式更新messages，因为更新了messages,从而更新页面
    const { messages, input , handleInputChange, handleSubmit ,append} = useChat({});
    const [model , setModel] = useState<modelType>('deepseek-v3');
    // 下滑锚点
    const endRef = useScollIntoDiv([messages]);
    //防止重复触发effct,不知道为什么会重复，没办法
    const hasSubmitted = useRef(false); // 用 ref 标记是否已提交

    const { homeInput , setHomeInput } = useMessagesStore();

    const {setChatInfo , curChatId} = useMessagesStore();
    //做一下防抖，核心就是，只有在500ms之后没有改变，我才回调进行真正的数据操作
    //所以需要一个定时器容器，真正的回调都依靠这个定时器，如果500ms内发生了改变，那么就清除掉这个定时器
    const [timer , setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
    //定时器必须清理
    useEffect(() => {
       return () => {
        if(timer){
            clearTimeout(timer);
        }
       }
    } , []);

    useEffect(() => {
        //是否真正baocun，要防抖
        if(timer) clearTimeout(timer);

        const newTimer = setTimeout(() => {
            //baocun messages
            if(curChatId) setChatInfo(curChatId , messages);
            console.log('更新message了')
        } , 500);

        setTimer(newTimer);//为了判断，必须要用一个这个容器
        
    } , [messages])

    //only once
    useEffect(() => {
        if(homeInput && !hasSubmitted.current) {
            // 直接调用 append 提交
            const content = homeInput;
            setHomeInput(undefined);//从首页输入跳转过来
            append({ role: "user", content: content });
            console.log("useEffect 执行！homeInput:", homeInput); // 看控制台是否打印两次
            //不知道为什么，会执行两次Effect,只能用ref防止重复了
            hasSubmitted.current = true;
        };
    } , [])

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
                <div key={message.id} className={`w-full box-border p-[2vh] flex flex-row ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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