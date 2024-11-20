import React, { useEffect, useState } from "react";
import { useSocket } from "../contexts/SocketContext";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

const ChatRoom = ({ room, user }) => {
    const socket = useSocket();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.emit("join_room", room);

            socket.on("receive_message", (data) => {
                setMessages((prev) => [...prev, data]);
            });
        }

        return () => {
            socket?.off("receive_message");
        };
    }, [socket, room]);

    const sendMessage = (content) => {
        if (socket) {
            const messageData = { sender: user, room, content };
            socket.emit("send_message", messageData);
            setMessages((prev) => [...prev, messageData]);
        }
    };

    return (
        <div>
            <MessageList messages={messages} />
            <ChatInput onSend={sendMessage} />
        </div>
    );
};

export default ChatRoom;
