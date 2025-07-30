"use client"
import { ChatInfo, useMessagesStore } from "@/app/store/messages-store";

import { NavBarItem } from "./NavBarItem";
import { useRouter } from "next/navigation";

function NavBar() {

    const { chatInfos ,curChatId ,setCurChatId , setHomeInput} = useMessagesStore();
    const router = useRouter();

    //新对话
    const handleNewChat = () => {
        setHomeInput(undefined);
        setCurChatId(undefined);
        router.push('/');
    }

    //点击卡片改变 对话
    const handleChangeChat = (chatId:number) => {
        console.log('切换chat页面')
        if(!chatId) return;
        setHomeInput(undefined);
        setCurChatId(chatId);
        router.push(`/chat/${chatId}`)
    }

    return (
        <div className="p-[1vh]">
            <div 
                onClick={handleNewChat}
                className="mb-3 shadow-[1px_2px_10px_rgba(0,0,0,0.5)] h-[6vh] mt-2 rounded-2xl bg-[#DBEAFE] flex flex-col justify-center items-center"
            >
                <span className="text-[#91A8FE] font-bold">开启新对话</span>
            </div>
            <div className="flex flex-col gap-2 justify-center">
                {
                    chatInfos?.map((chatInfo) => (
                        <div key={chatInfo.chatId} 
                            onClick={() => {handleChangeChat(chatInfo.chatId)}}
                            className="flex flex-col justify-center items-center p-[3px]"
                        >
                            {chatInfo.chatId && <NavBarItem isSelected={curChatId === chatInfo.chatId ? true : false} content={chatInfo.historyMessages[0]?.content}/>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default NavBar;