'use client'
import { Card } from "antd";


export interface NavBarItemProps {
    content:string;
    isSelected:boolean;
}

export function NavBarItem({content , isSelected}:NavBarItemProps) {
    return (
        <Card
            style={{ 
                width:'100%',
                border: '1px solid #f1f3f5',
                backgroundColor:`${isSelected ? '#DBEAFE' : '#FFFFFF'}`,
                boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.2)',
                overflowWrap: 'break-word', // 长文本自动换行
                fontWeight:'bold',
                fontSize:'17px'
            }}
        >{content}</Card>
    )
}