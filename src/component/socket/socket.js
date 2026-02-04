import { io } from "socket.io-client";

export const socket = io("http://localhost:7000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ SOCKET CONNECTED:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ SOCKET CONNECT ERROR:", err.message);
});

socket.on("disconnect", (reason) => {
  console.warn("⚠️ SOCKET DISCONNECTED:", reason);
});
