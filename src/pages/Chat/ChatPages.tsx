import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {ChatMessageType} from "../../api/chat-api";
// @ts-ignore
import ch from './ChatPage.module.css'

const ChatPages: React.FC = () => {
    return <div>
        <Chat/>
    </div>
};

const Chat: React.FC = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        let ws: WebSocket;
        const closeHandle = () => {
            console.log("Close webSocket");
            setTimeout(createChannel, 3000);
        };

        function createChannel() {
            ws?.removeEventListener('close', closeHandle);
            ws?.close();

            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws?.addEventListener('close', closeHandle);
            setWebSocket(ws);
        }

        createChannel();
        return () => {
            ws.removeEventListener('close', closeHandle);
            ws.close()
        };
    }, []);


    return <div className={ch.chat}>
        <Messages webSocket={webSocket}/>
        <AddMessageForm webSocket={webSocket}/>
    </div>
};

const Messages: React.FC<{ webSocket: WebSocket }> = ({webSocket}) => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [isAutoScroll, setIsAutoScrollI] = useState(true);
    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        webSocket?.addEventListener('message', messageHandler);

        return () => {
            webSocket?.removeEventListener('message', messageHandler)
        };
    }, [webSocket]);
    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }

    }, [messages]);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        var element = e.currentTarget;

        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            console.log("Scrolled")
        } else {
            console.log("scrolling:" + element.clientHeight, element.scrollHeight - element.scrollTop)
        }

    };
    return <div onScroll={scrollHandler}>
        {messages.map((el, index) => {
            return <Message key={index} message={el}/>
        }).reverse()}
        <div ref={messagesAnchorRef}/>
    </div>
};

const Message: React.FC<{ message: ChatMessageType | null }> = React.memo(({message}) => {
    return <div >
        <img style={{width: '177px'}} src={message.photo} alt={''}/>
        <br/>
        <b> {message.userName}</b>
        <br/>
        <b>{message.message}</b>
        <hr/>
    </div>
});

const AddMessageForm: React.FC<{ webSocket: WebSocket | null }> = ({webSocket}) => {
    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState < `pending` | `ready` > (`pending`);
    const openHandler = () => {
        setReadyStatus(`ready`)
    };
    useEffect(() => {
            webSocket?.addEventListener('open', openHandler);
            return () => {
                webSocket?.removeEventListener("open", openHandler)
            };
        }
        , [webSocket]);
    const sendMessage = () => {
        if (!message) {
            return;
        }
        webSocket?.send(message);
        setMessage('')
    };
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>
        <button disabled={webSocket !== null && readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
    </div>
};
export default ChatPages;
