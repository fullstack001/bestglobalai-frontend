import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
const apiPort = process.env.REACT_APP_API_PORT;


const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // const newSocket = io(`${apiPort}`); 
        const newSocket = io("http://localhost:5001"); 
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
