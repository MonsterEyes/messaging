import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/loginForm";
import { isTokenExpired, refreshToken, verifyToken } from "../utils/auth";

const LoginPage = () => {
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
            router.push("/conversations");
          } catch (err) {
            console.error("Failed to refresh token", err);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
        } else {
          try {
            await verifyToken(storedToken);
            setToken(storedToken);
            router.push("/conversations");
          } catch (err) {
            console.error("Invalid token", err);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
        }
      }
    };

    checkToken();
  }, [router]);

  useEffect(() => {
    if (token) {
      router.push("/conversations");
    }
  }, [token, router]);

  return <LoginForm onLoginSuccess={setToken} />;
};

export default LoginPage;
