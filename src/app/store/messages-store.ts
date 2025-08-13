import { type UIMessage } from 'ai';
import { create } from 'zustand';

export interface ChatInfo {
    chatId: number;
    historyMessages: UIMessage[];
}

interface State {
    chatInfos: ChatInfo[];
    curChatId:number | undefined;
    homeInput:string | undefined;
    canSend:boolean;
}

interface Actions {
    addChatInfo: (historyMessages: UIMessage[]) => number;
    setCurChatId:(value:number | undefined) => void;
    deleteChatInfo: (chatId: number | undefined) => void;
    setChatInfo:(chatId:number , historyMessages:UIMessage[]) => void;
    setHomeInput:(input:string | undefined) => void;
    changeCanSend:(value:boolean) => void;
}

export const useMessagesStore = create<State & Actions>((set) => ({
    chatInfos: [],
    curChatId:undefined,
    homeInput:undefined,
    canSend:true,
    changeCanSend:(value) =>  {
      set((state) => {
        console.log(`当前canSend：${value}`)
        return {...state , canSend:value}
      })  
    },
    setCurChatId:(value) => {
        set({curChatId:value})
    },
    addChatInfo: (historyMessages) => {
        const chatId = new Date().getTime();
        const newChatInfo = {
            chatId: chatId,
            historyMessages
        };
        set((state) => ({
            chatInfos: [newChatInfo , ...state.chatInfos]
        }));
        return chatId;
    },
    deleteChatInfo: (chatId) => {
        set((state) => ({
            chatInfos: state.chatInfos.filter((item) => item.chatId !== chatId)
        }));
    },
    setChatInfo:(chatId , historyMessages) => {
      set((state) => ({
        chatInfos:state.chatInfos.map((item) => {
            if(item.chatId === chatId){
                item.historyMessages = historyMessages;
            }
            return item;
        })
      }))  
    },
    setHomeInput:(input) => {
        set({homeInput:input})
    }
}));