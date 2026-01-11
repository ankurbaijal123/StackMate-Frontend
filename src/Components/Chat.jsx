import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios"
import { BASE_URL } from "../utils/constansts";
const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")
    const user = useSelector(store => store.user)
    const userId = user?.data._id

    const fetchChatMessages = async () => {
        const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
            withCredentials: true
        })
        const chatMessages = res?.data?.messages.map(msg => {
            return {
                firstName: msg?.senderId.firstName, newMessage: msg?.text, fromUserId: msg?.senderId._id, time: new Date(msg.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            }


        })
        setMessages(chatMessages)


    }
    useEffect(() => {
        fetchChatMessages()
    }, [targetUserId])

    useEffect(() => {
        if (!userId) return
        const socket = createSocketConnection()
        //as soon as the page loads establish the connection and emit the joinChat event 
        socket.emit("joinChat", { firstName: user.data.firstName, userId, targetUserId })

        socket.on("messageReceived", ({ firstName, newMessage, fromUserId, time }) => {
            setMessages((messages) => [...messages, { firstName, newMessage, fromUserId, time }])
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])

    const sendMessageFunction = () => {
        const socket = createSocketConnection()
        socket.emit("sendMessage", { firstName: user.data.firstName, userId, targetUserId, newMessage, time: new Date() })
        setNewMessage("")
    }


    return (
        <div className="w-3/4 mx-auto m-5 h-[70vh] flex flex-col rounded-xl border border-gray-600 bg-base-300 shadow-lg">

            <div className="p-4 border-b border-gray-600">
                <h2 className="text-lg font-semibold text-base-content">
                    Chat
                </h2>
            </div>

            {/* display messages here */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* messages will come here */}
                {messages.map((m, i) => {
                    const isMe = m.fromUserId === userId;

                    return (
                        <div key={i} className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
                            <div className="chat-header">
                                {m.firstName}
                                <time className="text-xs opacity-50 ml-2">{m.time}</time>
                            </div>

                            <div className={`chat-bubble ${isMe ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>
                                {m.newMessage}
                            </div>
                        </div>
                    );
                })}

            </div>

            {/* display input box and send button here */}
            <div className="p-4 border-t border-gray-600 flex items-center gap-3">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 rounded-lg border border-gray-500 bg-transparent px-3 py-2 text-base-content focus:outline-none focus:ring-2 focus:ring-primary placeholder:italic"
                />
                <button className="btn btn-primary px-6 rounded-xl"
                    onClick={() => sendMessageFunction()}>
                    Send
                </button>
            </div>

        </div>
    );
};

export default Chat;
