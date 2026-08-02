'use client';

import { type SignupState } from "@/lib/auth-action";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useState } from "react";
import { Mail, XCircle, Lock, User as UserIcon, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";
import { useFormStatus } from "react-dom";
import { LoaderIcon } from "lucide-react";
import { createUserSignup } from "@/lib/auth-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialState: SignupState = {
    message: null,
    errors: {},
    success: false,
};

function Submit() {
    const { pending } = useFormStatus();
    return (
        <Button
            type={pending ? "button" : "submit"}
            disabled={pending}
            className="w-full py-3.5 text-sm font-semibold rounded-xl shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            style={{
                backgroundColor: 'var(--color-button-bg)',
                color: 'var(--color-button-text)'
            }}
        >
            {pending ? (
                <>
                    <LoaderIcon className="w-4 h-4 animate-spin" />
                    <span>Setting up account...</span>
                </>
            ) : (
                <>
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                </>
            )}
        </Button>
    );
}

export default function SignupForm() {
    const [ showPassword, setShowPassword ] = useState(false);
    const [showErrors, setShowErrors] = useState(true);
    const [state, formAction] = useActionState(
        createUserSignup,
        initialState
    );
    const router = useRouter();

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Account created successfully!");
            router.push(`/login?message=signup-success`);
            return;
        }

        if (state.message) {
            // Handle field-level validation errors state if tracked locally
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
    }, [state, router]);

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10 transition-colors duration-300"
            style={{ backgroundColor: 'var(--color-background)' }}
        >
            <main className="max-w-md w-full mx-auto">
                {/* Card Container */}
                <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-[2.5rem] border border-white/20 overflow-hidden transition-all duration-300 max-sm:mx-4">

                    {/* Header Banner */}
                    <div
                        className="px-6 py-8 sm:px-10 text-white relative overflow-hidden"
                        style={{ backgroundColor: 'var(--color-header)' }}
                    >
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full opacity-10 bg-white pointer-events-none blur-2xl" />
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/10 mb-3 backdrop-blur-md">
                                <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-callout)' }} />
                                <span>Sacrament Planner Pro</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Create an Account</h1>
                            <p className="text-sm opacity-80 mt-1">Join to start organizing and managing ward meeting programs.</p>
                        </div>
                    </div>

                    {/* General Error Message Banner if available */}
                    {state.message && !state.success && Object.keys(state.errors || {}).length === 0 && (
                        <div className="mx-6 mt-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-center">
                            {state.message}
                        </div>
                    )}

                    {/* Form Layout */}
                    <form action={formAction} className="p-6 sm:p-10 space-y-8">

                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <UserIcon className="w-4 h-4 text-gray-400" /> Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="e.g. John Doe"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all"
                                aria-describedby="name-error"
                            />
                            <div id="name-error" aria-live="polite">
                                {showErrors && state.errors?.name?.map((error) => (
                                    <p key={error} className="mt-1 text-xs font-medium text-red-500 animate-in fade-in duration-400">{error}</p>
                                ))}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
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
                                    <p key={error} className="mt-1 text-xs font-medium text-red-500 animate-in fade-in duration-400">{error}</p>
                                ))}
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                <Lock className="w-4 h-4 text-gray-400" /> Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="At least 5 characters"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all"
                                    aria-describedby="password-error"
                                />
                                <span title={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer">
                                    {!showPassword ? <Eye className="size-4 text-gray-400" /> : <EyeOff className="size-4 text-gray-400" />}</span>
                            </div>

                            <div id="password-error" aria-live="polite">
                                {showErrors && state.errors?.password?.map((error) => (
                                    <p key={error} className="mt-1 text-xs font-medium text-red-500 animate-in fade-in duration-400">{error}</p>
                                ))}
                            </div>
                        </div>

                        {/* Footer Action Bar */}
                        <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
                            <Submit />
                            <div className="text-center">
                                <p className="text-xs text-gray-500">
                                    Already have an account?{' '}
                                    <a href="/login" className="font-semibold text-gray-800 hover:underline">
                                        Log in
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