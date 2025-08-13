
'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { modelType } from '@/app/component/Welcome';
import { InputArea } from '@/app/component/Welcome/InputArea';
import MessageCard from '@/app/component/Chat/MessageCard';
import { useScollIntoDiv } from '@/app/my-hooks/useScollIntoDiv';
import { useMessagesStore } from '@/app/store/messages-store';

export default function Page() {
    //这个钩子的handleSubmit会把input丢进messages中，然后发送请求到后端
    //然后根据返回信息，流式更新messages，因为更新了messages,从而更新页面
    const { messages, setMessages ,input , handleInputChange, handleSubmit ,append} = useChat({});
    const [model , setModel] = useState<modelType>('deepseek-v3');
    // 下滑锚点
    const endRef = useScollIntoDiv([messages]);
    //互斥排斥锁
    const updateLock = useRef(false);
    //防止重复触发effct,不知道为什么会重复，没办法
    const hasSubmitted = useRef(false); // 用 ref 标记是否已提交

    const {setChatInfo , curChatId , chatInfos, homeInput , setHomeInput ,
        canSend , changeCanSend
    } = useMessagesStore();



    //做一下防抖，核心就是，只有在500ms之后没有改变，我才回调进行真正的数据操作
    //所以需要一个定时器容器，真正的回调都依靠这个定时器，如果500ms内发生了改变，那么就清除掉这个定时器
    const [timer , setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
    //定时器必须清理
    useEffect(() => {
       return () => {
            if(timer){
                clearTimeout(timer);
            }
            changeCanSend(true); //销毁也改成true
        }
    } , []);

    //回复的更新写入zustand
    useEffect(() => {
        //是否真正保存，要防抖
        if(timer) clearTimeout(timer);

        //判断初始化hasSubmitted可以防止防抖产生的chatinfo定时器更新的闪屏
        if(hasSubmitted.current && !updateLock.current && curChatId && !homeInput){
            updateLock.current = true;//创建要拿锁，真正的修改也要拿锁
            //只要message修改了，触发了这个副作用，我就不能让用户回复，直到真正写入zustand,才说明恢复完了
            console.log('是1改的')
            changeCanSend(false);//改为false
            //创建一个定时器去更新message
            const newTimer = setTimeout(() => {
                if(!updateLock.current) {
                    updateLock.current = true;
                    //baocun messages
                    if(curChatId) {
                        setChatInfo(curChatId , messages);
                    }
                    console.log('更新chatinfos了')
                    updateLock.current = false;
                };
                changeCanSend(true);//回复完了，写入了zustand,改为true
            } , 500);
            updateLock.current = false;

            setTimer(newTimer);//为了判断，必须要用一个这个容器
        }

        
    } , [messages])

    //only once 初始化
    useEffect(() => {
        //从首页跳转到聊天页面
        if(homeInput && !hasSubmitted.current) {
            // 直接调用 append 提交
            const content = homeInput;
            setHomeInput(undefined);//从首页输入跳转过来
            append({ role: "user", content: content });
            console.log('是2改的')
            changeCanSend(false);//发送改为false
            console.log("useEffect 执行！homeInput:", homeInput); // 看控制台是否打印两次
            //不知道为什么，会执行两次Effect,只能用ref防止重复了
            hasSubmitted.current = true;
        }
        //更新messages为chatinfo,也就是切换聊天页面
            console.log('尝试更新messages')
            if(!updateLock.current) {
                updateLock.current = true;
                if(homeInput === undefined && curChatId){
                    //尝试更新messages为当前ID的那个储存的
                    const chatInfosFilter = chatInfos?.filter((item) => item.chatId === curChatId);
                    if(!chatInfosFilter || chatInfosFilter.length <= 0) return;
                    const chatInfo = chatInfosFilter[0];
                    if(chatInfo){
                        console.log('gengxin messages');
                        setMessages(chatInfo.historyMessages);
                        console.log(`msgs = ${messages}`)
                        changeCanSend(true);//如果是切换聊天页面，那肯定是可以发送的
                    }
                }
                updateLock.current = false;
            }
    } , [])

    //handleModelChange
    const handleModelChange = () => {
        if(model === 'deepseek-v3') setModel('deepseek-r1');
        else if(model === 'deepseek-r1') setModel('deepseek-v3');
    }

  return (
    // messages and inputs layout
    <div className='flex flex-col h-screen justify-between items-center w-full'>
        {/* 消息的外层容器可以滚动 */}
        <div className='w-full flex-1 overflow-y-auto'>
            {/* messages row layout */}
            <div className='w-full flex flex-col gap-[6px]'> 
                {messages.map(message => (
                    // this row need 1row 100% full 1 msg by 1 msg no 2msg in row
                    // box layout right or left
                    <div key={message.id} className={`w-full box-border p-[4vh] flex flex-row ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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
        </div>


        {/* 输入框 */}
        <div className='w-full box-border p-[4vh]'>
            <InputArea value={input} onInputChange={handleInputChange}
                model={model}
                onModelChange={handleModelChange}
                handleSubmit={handleSubmit}
            />
        </div>
    </div>
  );
}