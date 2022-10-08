let subscribers = [] as SubscriberType[];
let ws: WebSocket | null;
let messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    // @ts-ignore
    subcribers.forEach(s => s(newMessages))
};
const closeHandle = () => {
    console.log("Close webSocket");
    setTimeout(createChannel, 3000);
};

function createChannel() {
    let ws: WebSocket;
    const closeHandle = () => {
        console.log("Close webSocket");
        setTimeout(createChannel, 3000);
    };
    ws?.removeEventListener('close', closeHandle);
    ws?.close();

    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws?.addEventListener('close', closeHandle);
    ws?.addEventListener('message', messageHandler);
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = [];
        ws?.removeEventListener('close', closeHandle);
        ws?.removeEventListener('message', messageHandler);
        ws?.close();
    },
    subscribe(callBack: SubscriberType) {
        subscribers.push(callBack);
        return () => {
            subscribers = subscribers.filter(s => s !== callBack)
        }
    },
    unsubscribe(callBack: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callBack)
    },
    send(message: string) {
        ws?.send(message);
    }

};
type SubscriberType =
    (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}