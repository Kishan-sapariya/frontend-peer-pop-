import { io } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000";

const socket = io(API_URL, {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket"],
});

export default socket;
