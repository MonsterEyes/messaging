import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Message {
  messageDateTime: string;
  sourceEnum: string;
  message: string;
}

const ConversationThread = ({
  token,
  customerId,
  firstName,
  lastName,
}: {
  token: string;
  customerId: string;
  firstName: string;
  lastName: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages/${customerId}`, {
        params: { token },
      });
      setMessages(response.data.messages);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [token, customerId]);

  const handleSendMessage = async () => {
    try {
      await axios.post(`/api/messages/${customerId}`, { message, token });
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groupedMessages: { [key: string]: Message[] } = {};
    messages.forEach((msg) => {
      const date = new Date(msg.messageDateTime).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }
      // @ts-ignore
      groupedMessages[date].push(msg);
    });
    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex h-screen flex-col">
      <div className="bg-gray-100 p-4">
        <div className="flex items-center">
          <button
            onClick={() => router.push("/conversations")}
            className="mr-4 text-blue-500 hover:text-blue-700"
          >
            &lt;
          </button>
          <h3 className="text-l font-bold">
            {firstName} {lastName}
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center overflow-y-scroll p-4">
        {Object.keys(groupedMessages).map((date) => (
          <div key={date} className="w-full">
            <div className="mb-4 text-center text-gray-500">{date}</div>
            {/* @ts-ignore */}
            {groupedMessages[date].map((msg, index) => (
              <div
                key={index}
                className={`mx-auto mb-4 max-w-xl rounded-lg p-3 ${
                  msg.sourceEnum === "cp"
                    ? "self-end bg-blue-500 text-white"
                    : "self-start bg-gray-300 text-black"
                }`}
              >
                <p>{msg.message}</p>
                <small className="mt-2 block text-right text-xs">
                  {new Date(msg.messageDateTime).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </small>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t bg-white p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mr-2 flex-1 rounded-lg border p-2"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationThread;
