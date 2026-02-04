import { useEffect } from "react";
import { socket } from "./socket";
import { useAuth } from "../Context/authContext/authContext";

function SocketManager() {
  const { user } = useAuth();

  // Join user room
  useEffect(() => {
    if (!user?.id) return;

    const onConnect = () => {
      socket.emit("joinUser", user.id);
    };

    socket.on("connect", onConnect);

    return () => {
      socket.emit("leaveUser", user.id);
      socket.off("connect", onConnect);
    };
  }, [user?.id]);

  // Join admin room
  useEffect(() => {
    const onConnect = () => {
      socket.emit("joinAdmin");
    };

    socket.on("connect", onConnect);
    socket.on("connect", () => {
      console.log("✅ socket connected", socket.id);
    });
    return () => {
      socket.emit("leaveAdmin");
      socket.off("connect", onConnect);
    };
  }, []);

  return null; // no UI needed
}

export default SocketManager;
