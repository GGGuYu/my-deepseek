import { role } from "@/app/types";
import { Card } from "antd";
import ReactMarkdown from 'react-markdown';

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

    return (
        <div>
            {
                role === 'user' && <div>{'User: '}</div>
            }
            {
                <Card 
                    style={{ 
                        border: '1px solid #f1f3f5',
                        boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.2)',
                        width: 'fit-content', // 宽度自适应内容
                        maxWidth: '100%',     // 不超过父容器宽度
                        overflowWrap: 'break-word', // 长文本自动换行
                    }}
                >
                        <ReactMarkdown>{content}</ReactMarkdown>
                </Card>
            }
        </div>
    )

}

export default MessageCard;