import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ConversationList from "~/components/conversationList";
import { isTokenExpired, refreshToken } from "~/utils/auth";

const ConversationsPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    const checkToken = async () => {
      if (storedToken && storedRefreshToken) {
        if (isTokenExpired(storedToken)) {
          try {
            const { access } = await refreshToken(storedRefreshToken);
            localStorage.setItem("accessToken", access);
            setToken(access);
          } catch (err) {
            console.error("Failed to refresh token", err);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            router.push("/login");
          }
        } else {
          setToken(storedToken);
        }
      } else {
        router.push("/login");
      }
    };

    checkToken();
  }, [router]);

  if (!token) {
    return <p>Loading...</p>;
  }

  return <ConversationList token={token} />;
};

export default ConversationsPage;
