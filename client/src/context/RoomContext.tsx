import { createContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client"

interface RoomProviderProps {
  children: ReactNode;
}

const WS = 'http://localhost:8080';

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent<RoomProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const enterRoom = ({ roomId }: { roomId: "string" }) => {
    console.log({ roomId })
    navigate(`/room/${roomId}`);
  }
  useEffect(() => {
    ws.on("room-created", enterRoom);
  }, [])
  return (
    <RoomContext.Provider value={{ ws }}>{children}</RoomContext.Provider>
  )
};
