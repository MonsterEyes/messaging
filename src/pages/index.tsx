import Link from "next/link";

const HomePage = () => (
  <div className="flex h-screen items-center justify-center bg-gray-100">
    <div className="text-center">
      <h1 className="mb-8 text-3xl font-bold">Welcome to Messaging</h1>
      <div className="space-x-4">
        <Link
          href="/login"
          className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition duration-200 hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          href="/conversations"
          className="inline-block rounded-lg bg-green-500 px-6 py-3 text-white transition duration-200 hover:bg-green-600"
        >
          Conversations
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
