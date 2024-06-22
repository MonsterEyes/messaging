import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ConversationThread from "../../components/conversationThread";
import { isTokenExpired, refreshToken } from "../../utils/auth";

const ConversationThreadPage = () => {
  const router = useRouter();
  const { id, firstName, lastName } = router.query;
  const [token, setToken] = useState<string | null>(null);

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

  if (!token || !id || !firstName || !lastName) {
    return <p>Loading...</p>;
  }

  return (
    <ConversationThread
      token={token}
      customerId={id as string}
      firstName={firstName as string}
      lastName={lastName as string}
    />
  );
};

export default ConversationThreadPage;
