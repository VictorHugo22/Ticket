'use client';

import LoginForm from "@/app/components/LoginForm";
import { useLogin } from "@/app/hook/useLogin";

export default function Home() {
  const { login, error } = useLogin();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <LoginForm onLogin={login} error={error} />
      </main>
    </div>
  );
}


