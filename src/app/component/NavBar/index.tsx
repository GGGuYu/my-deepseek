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
    const handleChangeChat = (chatId:number | undefined) => {
        if(!chatId) return;
        console.log('切换chat页面')
        setHomeInput(undefined);
        setCurChatId(chatId);
        router.push(`/chat/${chatId}`)
    }

    return (
        <div className="w-full p-[2vh]">
            <div 
                onClick={handleNewChat}
                className="cursor-pointer mb-3 w-full shadow-[1px_2px_10px_rgba(0,0,0,0.5)] h-[6vh] mt-2 rounded-2xl bg-[#DBEAFE] flex flex-row justify-center items-center
                hover:scale-[1.02] hover:shadow-[3px_4px_12px_rgba(0,0,0,0.5)] hover:border-black
                transition-all duration-200 ease-in-out"
            >
                <span className="text-[#91A8FE] font-bold">开启新对话！</span>
            </div>
            <div className="w-full flex flex-col justify-center">
                {
                    chatInfos?.map((chatInfo) => (
                        <div key={chatInfo.chatId} className="w-full h-[100%] p-[2vh]">
                            <div
                                className="w-full h-[100%] cursor-pointer flex flex-col justify-center items-center"
                            >
                                {chatInfo.chatId && <NavBarItem handleChatChange={handleChangeChat} chatId={chatInfo.chatId}  isSelected={curChatId === chatInfo.chatId ? true : false} content={chatInfo.historyMessages[0]?.content}/>}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default NavBar;