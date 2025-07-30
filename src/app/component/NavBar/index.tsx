"use client"
import { ChatInfo, useMessagesStore } from "@/app/store/messages-store";

import { useEffect, useState } from "react";

function NavBar() {

    const { chatInfos } = useMessagesStore();


    return (
        <div className="">
            {
                chatInfos?.map((chatInfo) => (
                    <div key={chatInfo.chatId}>
                        {chatInfo.historyMessages[0]?.content}
                    </div>
                ))
            }
        </div>
    )
}

export default NavBar;