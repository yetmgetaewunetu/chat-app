import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    isMessageLoading,
    getMessages,
    subscribeToMessage,
    unsubscribeFromMessage,
  } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessage();

    return () => unsubscribeFromMessage();
  }, [getMessages, selectedUser, unsubscribeFromMessage, subscribeToMessage]);

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messages && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading)
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === selectedUser._id ? "chat-start" : "chat-end"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === selectedUser._id
                      ? selectedUser.profilePic || "/avatar.png"
                      : authUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className=" chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="attachement"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
