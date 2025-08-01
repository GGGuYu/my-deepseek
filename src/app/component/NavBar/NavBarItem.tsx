'use client'
import { Card } from "antd";
import { DeleteOutlined } from '@ant-design/icons'
import { useMessagesStore } from "@/app/store/messages-store";
import { useRouter } from "next/navigation";


export interface NavBarItemProps {
    content:string;
    chatId:number | undefined;
    handleChatChange:(chatId:number | undefined) => void;
    isSelected:boolean;
}

export function NavBarItem({content, handleChatChange , chatId , isSelected}:NavBarItemProps) {
    const router = useRouter();
    const { deleteChatInfo , setCurChatId , setHomeInput} = useMessagesStore();
    
    const handleDelete = (Id:number | undefined) => {
        if(!Id) return;
        deleteChatInfo(Id);
        setCurChatId(undefined);
        setHomeInput(undefined);
        router.push('/');
    }

    return (
        <Card
            onClick={() => {handleChatChange(chatId)}}
            className="h-[100%] w-full border border-[#f1f3f5] shadow-[1px_2px_10px_rgba(0,0,0,0.2)] p-0
                hover:scale-[1.02] hover:shadow-[3px_4px_12px_rgba(0,0,0,0.5)] hover:border-black
                transition-all duration-200 ease-in-out"
            style={{ 
                width:'100%',
                backgroundColor:`${isSelected ? '#DBEAFE' : '#FFFFFF'}`,
                overflowWrap: 'break-word', // 长文本自动换行
                fontWeight:'bold',
                fontSize:'17px',
                padding:'0px'
            }}
        >
            <div 
            className="w-full h-[100%] flex flex-row items-center"
            >
                <div className="overflow-hidden">{content?.substring(0, 15)}</div>
                <div className="flex-1"></div>
                <div className="w-8 h-8 flex flex-row items-center justify-end">
                    <div className="w-8 h-8 cursor-pointer flex flex-col justify-center items-center border-1 border-[#acf] rounded-lg
                        hover:scale-[1.1] hover:bg-[#EFFBFF]" 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(chatId)
                            }}>
                        <DeleteOutlined />
                    </div>
                </div>
            </div>
        </Card>
    )
}