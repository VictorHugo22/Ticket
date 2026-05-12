'use client';
import ResetPasswordForm from "@/app/components/ResetPass";
import { useResetPassword } from "@/app/hook/useReset";

export default function ResetPasswordPage() {
    const { resetPassword, error, success } = useResetPassword();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
            <ResetPasswordForm
                onReset={resetPassword}
                error={error}
                success={success}
            />
        </div>
    );
}


