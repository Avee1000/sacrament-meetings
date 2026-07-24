'use client'

import { useActionState, useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Lock, LogIn, ShieldCheck } from "lucide-react";
import { useFormStatus } from "react-dom";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { authenticateUser as createUserLogin } from "@/lib/auth-action";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export type LoginState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string | null;
    success?: boolean;
};

const initialState: LoginState = {
    message: null,
    errors: {},
};

function Submit() {
    const { pending } = useFormStatus();
    return (
        <Button
            type={pending ? "button" : "submit"}
            disabled={pending}
            className="w-full px-8 py-3 text-sm font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 transform active:scale-95"
            style={{
                backgroundColor: 'var(--color-button-bg)',
                color: 'var(--color-button-text)'
            }}
        >
            {pending ? (
                <>
                    <LoaderIcon className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                </>
            ) : (
                <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Workspace</span>
                </>
            )}
        </Button>
    );
}

// 1. Isolate the search-params logic into a separate inner component
function SearchParamsHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const messageKey = searchParams?.get("message");
        const messages: Record<string, string> = {
            "signup-success": "Account created successfully. Please sign in with your new account.",
        };

        if (messageKey && messages[messageKey]) {
            toast.success(messages[messageKey]);
            router.replace("/login");
        }
    }, [searchParams, router]);

    return null;
}

export default function LoginForm() {
    const [showErrors, setShowErrors] = useState(true);
    const [state, formAction] = useActionState(
        createUserLogin,
        initialState
    );

    useEffect(() => {
        if (state.message) {
            if (state.errors && Object.keys(state.errors).length > 0) {
                setShowErrors(true);
                const timer = setTimeout(() => setShowErrors(false), 5000);
                toast.error(state.message, {
                    description: (
                        <ul className="list-disc pl-5">
                            {state.errors && Object.entries(state.errors).map(([key, value]) => (
                                <li key={key} className="text-red-400">
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    ),
                    icon: <></>,
                });
                return () => clearTimeout(timer);
            }
        }
    }, [state]);

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10 transition-colors duration-300 relative overflow-hidden"
            style={{ backgroundColor: 'var(--color-background)' }}
        >
            {/* 2. Wrap the search params consumer in Suspense */}
            <Suspense fallback={null}>
                <SearchParamsHandler />
            </Suspense>

            {/* Subtle Geometric Overlay Lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[16px_16px]" />

            <main className="max-w-md w-full mx-auto relative z-10">
                <div className="bg-white/95 backdrop-blur-3xl shadow-[0_10px_50px_rgba(0,0,0,0.14)] rounded-[2.5rem] border border-white/60 overflow-hidden transition-all duration-300">
                    <div className="pt-10 px-8 text-center relative">
                        <div
                            className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                            style={{ backgroundColor: 'var(--color-header)' }}
                        >
                            <LogIn className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
                            Sacrament Planner
                        </h1>
                        <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-widest">
                            Authorized Access Portal
                        </p>
                    </div>

                    {showErrors && state.message && !state.success && Object.keys(state.errors || {}).length === 0 && (
                        <div className="mx-6 mt-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-center animate-in fade-in">
                            {state.message}
                        </div>
                    )}

                    <form action={formAction} className="p-6 sm:p-10 space-y-8">
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                <Mail className="w-4 h-4 text-gray-400" /> Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all"
                                aria-describedby="email-error"
                            />
                            <div id="email-error" aria-live="polite">
                                {showErrors && state.errors?.email?.map((error) => (
                                    <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                    <Lock className="w-4 h-4 text-gray-400" /> Password
                                </label>
                                <a href="/forgot-password" className="text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all"
                                aria-describedby="password-error"
                            />
                            <div id="password-error" aria-live="polite">
                                {showErrors && state.errors?.password?.map((error) => (
                                    <p key={error} className="mt-1 text-xs font-medium text-red-500">{error}</p>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
                            <Submit />
                            <div className="flex items-center justify-center gap-1.5 pt-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <p className="text-xs text-gray-500">
                                    Don&apos;t have an account?{' '}
                                    <a href="/signup" className="font-semibold text-gray-800 hover:underline">
                                        Sign up
                                    </a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}