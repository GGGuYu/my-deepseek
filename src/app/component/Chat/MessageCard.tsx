"use client"
import { role } from "@/app/types";
import { Card } from "antd";
import ReactMarkdown from 'react-markdown';
import { CopyOutlined , CheckOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react";

export interface MessageCardProps {
    role:role | string;
    thinking?:string;
    content?:string;
}

//之后可以暴露API提供更改功能 , 还可以加入加载suspense动画
function MessageCard(props:MessageCardProps) {
    const {
        role,
        thinking,
        content
    } = props;

    const [copyed , setCopyed] = useState(false);
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

    // 复制方法 , 一键复制
    function handleCopyText() {
        if(content){
            // 关键
            navigator.clipboard
                .writeText(content)
                .then(() => {
                    setCopyed(true);
                    if(timer) clearTimeout(timer);
                    const newTimer = setTimeout(() => {
                        setCopyed(false);
                    } , 2000);
                    setTimer(newTimer);
                })
                .catch((error) => {
                    window.alert('复制出现错误');
                });
        }
    };

    return (
        <div>
            {
                role === 'user' && (
                    <></>
                )
            }
            {
                role === 'assistant' && (
                    <div className="flex flex-row justify-start mb-1">
                        <div>🤖：</div>
                    </div>
                )
            }
            {
                thinking && thinking !== '' && (
                <Card 
                    style={{ 
                        border: '1px solid #f1f3f5',
                        boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.2)',
                        width: 'fit-content', // 宽度自适应内容
                        maxWidth: '100%',     // 不超过父容器宽度
                        overflowWrap: 'break-word', // 长文本自动换行
                        fontSize:'15px'
                    }}
                >
                        <ReactMarkdown>{thinking}</ReactMarkdown>
                </Card>
                )
            }
            {
                <Card 
                    className="border border-[#f1f3f5] shadow-[1px_2px_10px_rgba(0,0,0,0.2)]
                        hover:scale-[1.02] hover:shadow-[3px_4px_12px_rgba(0,0,0,0.5)] hover:border-black
                        transition-all duration-200 ease-in-out"
                    style={{ 
                        width: 'fit-content', // 宽度自适应内容
                        maxWidth: '100%',     // 不超过父容器宽度
                        overflowWrap: 'break-word', // 长文本自动换行
                        fontSize:'15px'
                    }}
                >
                        <ReactMarkdown>{content}</ReactMarkdown>
                </Card>
            }
            <div className="mt-3 flex flex-row items-center gap-2">
                <div className="w-8 h-8 cursor-pointer bg-[#fff] flex flex-col justify-center items-center border-1 border-[#d3d5d7] rounded-lg
                hover:scale-[1.1] hover:bg-[#f1f3f5]" 
                onClick={handleCopyText}>
                    { !copyed ? <CopyOutlined /> : <CheckOutlined />}
                </div>
            </div>
        </div>
    )

}

export default MessageCard;