// components/ConversationList.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ConversationList = ({ token }: { token: string }) => {
  const [conversations, setConversations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await axios.get("/api/conversations", {
        params: { token },
      });
      setConversations(response.data);
      console.log(response.data);
    };

    fetchConversations();
  }, [token]);

  const handleConversationClick = (
    id: string,
    firstName: string,
    lastName: string,
  ) => {
    router.push({
      pathname: `/conversations/${id}`,
      query: { firstName, lastName },
    });
  };

  const truncateMessage = (message: string, maxLength: number) => {
    return message.length > maxLength
      ? `${message.substring(0, maxLength)}...`
      : message;
  };

  return (
    <section className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Messages</h2>
      {conversations.map((conversation: any) => (
        <article
          key={conversation.id}
          onClick={() =>
            handleConversationClick(
              conversation.id,
              conversation.firstName,
              conversation.lastName,
            )
          }
          className="mb-4 flex cursor-pointer items-center rounded-lg border p-4 transition-shadow duration-200 hover:shadow-lg"
        >
          <div className="relative mr-4 w-12">
            {conversation.isActive && (
              <div className="absolute -left-3.5 top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full border border-white bg-green-500"></div>
            )}
            <div className="relative h-12 w-12 bg-gray-300"></div>
          </div>
          <div className="flex-grow">
            <header className="mb-1 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {conversation.firstName} {conversation.lastName}
              </h3>
              <time className="text-sm text-gray-500">
                {new Date(conversation.messageDateTime).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  },
                )}
              </time>
            </header>
            <p className="text-sm text-gray-700">
              {truncateMessage(conversation.message, 50)}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ConversationList;
