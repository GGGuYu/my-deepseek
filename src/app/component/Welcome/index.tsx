'use client'

import { useState } from "react";
import { InputArea } from "./InputArea";

export type modelType = 'deepseek-v3' | 'deepseek-r1';

function Welcome() {

    const [input , setInput] = useState<string>('');
    const [model , setModel] = useState<modelType>('deepseek-v3');

    //处理发消息
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();//禁止掉原有事件逻辑,但是可以继承submit的触发方式
        let content = input;
        setInput('');
        if(content.trim() === '') return;
        // console.log(content);
    }

    //handleModelChange
    const handleModelChange = () => {
        if(model === 'deepseek-v3') setModel('deepseek-r1');
        else if(model === 'deepseek-r1') setModel('deepseek-v3');
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            {/* <div className="h-1/5"></div> */}
            {/* 盒子宽度正好用一半 ， 然后让这个盒子居中，输入框和标题就填满这个盒子*/}
            <div className="w-1/2 flex flex-col ">
            {/* 提示标题 */}
                <span className="text-bold text-2xl text-center">
                    有什么可以帮您的吗？
                </span>
                <InputArea value={input} onInputChange={(e) => {setInput(e.target.value)}}
                    model={model}
                    onModelChange={handleModelChange}
                    handleSubmit={handleSubmit}
                    />
            </div>
        </div>
    )
}

export default Welcome;