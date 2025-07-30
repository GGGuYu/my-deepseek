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
}

interface Actions {
    addChatInfo: (historyMessages: UIMessage[]) => number;
    setCurChatId:(value:number) => void;
    deleteChatInfo: (chatId: number | undefined) => void;
    setChatInfo:(chatId:number , historyMessages:UIMessage[]) => void;
    setHomeInput:(input:string | undefined) => void;
}

export const useMessagesStore = create<State & Actions>((set) => ({
    chatInfos: [],
    curChatId:undefined,
    homeInput:undefined,
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
            chatInfos: [...state.chatInfos, newChatInfo]
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