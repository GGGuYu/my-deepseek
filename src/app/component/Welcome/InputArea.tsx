import React from "react";
import { type modelType } from ".";

interface InputAreaProps {
    value:string;
    model:modelType;
    onInputChange:(e:any) => void;
    onModelChange:() => void;
    handleSubmit:(e:React.FormEvent<HTMLFormElement>) => void;
}


export function InputArea({value , model ,onInputChange, onModelChange , handleSubmit}:InputAreaProps) {
    
    const handleKeyDown = (e:any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.form.requestSubmit();//触发提交
        }
        // 正常按 Enter 提交
        // Ctrl+Enter huandang
    };

    return (
        <>
            {/* 输入框 */}
            <div className="flex flex-col items-center justify-center mt-4
            shadow-lg border-[1px] border-gray-300 h-35 rounded-2xl">
                <form className="w-full h-[100%]" onSubmit={(e) => {handleSubmit(e)}} >
                        <textarea onKeyDown={handleKeyDown} className="w-[100%] h-3/5 p-3 focus:outline-none resize-none"
                            value={value} onChange={onInputChange}
                        >
                        </textarea>
                        <div className="w-full h-2/5 flex flex-row items-center px-3 mb-3">
                            {/* <div className={`flex flex-col justify-center text-center w-[130px] h-[30px] border-[1px] border-solid border-[#000] rounded-lg cursor-pointer
                                ${model === 'deepseek-r1' ? 'bg-blue-100 text-blue-500' : ''}`}
                                onClick={onModelChange}
                                >
                                <span>深度思考(R1)</span>
                            </div> */}
                            {/* 占位 */}
                            <div className="flex-auto"></div>
                            {/* 发送按钮 */}
                            <button 
                                className="flex flex-col justify-center text-center bg-blue-300 w-[80px] h-[30px] border-[1px] border-solid border-[#000] rounded-full cursor-pointer" type="submit">
                                <span>发送</span>
                            </button>
                        </div>
                </form>
            </div>
        </>
    )
}