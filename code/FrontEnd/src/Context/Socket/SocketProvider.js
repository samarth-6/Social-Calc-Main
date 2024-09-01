import React, { useContext, useMemo } from "react";
import { io } from "socket.io-client";
import { createContext } from "react";

const SocketContext = createContext();

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => io('https://social-calc01.onrender.com'), []);
  
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
