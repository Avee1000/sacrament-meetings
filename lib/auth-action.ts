'use server'

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

const SignupFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters.")
        .max(100, "Name is too long."),
    email: z
        .string()
        .trim()
        .email("Please enter a valid email address."),
    password: z
        .string()
        .min(5, "Password must be at least 5 characters long."),
});

const LoginFormSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please enter a valid email address."),
    password: z
        .string()
        .min(1, "Password is required."),
});
export type SignupState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
    success?: boolean;
};

export type LoginState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string | null;
    success?: boolean;
};

/**
 * Extracts and maps FormData fields for user registration, enforcing "member" role by default.
 */
function getUserSignupData(formData: FormData) {
    return {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        role: "member", // Default role enforced programmatically
    };
}

export async function createUserSignup(prevState: SignupState, formData: FormData): Promise<SignupState> {
    const parsed = SignupFormSchema.safeParse(getUserSignupData(formData));

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to register user.',
        };
    }

    const { name, email, password } = parsed.data;
    const role = "member";

    try {
        // Check if user already exists
        const existingUser = await sql`
            SELECT id FROM users WHERE email = ${email}
        `;

        if (existingUser.rowCount && existingUser.rowCount > 0) {
            return {
                errors: { email: ["An account with this email already exists."] },
                message: 'Registration failed. Email is already in use.',
            };
        }

        // Hash the password securely before storing
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert new user into the database with default member role
        await sql`
            INSERT INTO users (name, email, "passwordHash", role, created_at, updated_at)
            VALUES (${name}, ${email}, ${passwordHash}, ${role}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;
    } catch (error) {
        console.error("Database Signup Error:", error);
        return {
            message: 'Database Error: Failed to create user account.',
        };
    }

    revalidatePath('/login');
    redirect('/login');
}

/**
 * Extracts and maps FormData fields for user authentication.
 */
function getUserLoginData(formData: FormData) {
    return {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
    };
}

export async function authenticateUser(prevState: LoginState, formData: FormData): Promise<LoginState> {
    // 1. Extract values manually from FormData for Zod validation
    const rawData = {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
    };

    const parsed = LoginFormSchema.safeParse(rawData);

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to sign in.',
        };
    }

    try {
        // 2. Trigger NextAuth's signIn passing the formData directly
        await signIn('credentials', {
            email: parsed.data.email,
            password: parsed.data.password,
            redirectTo: '/meetings',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid email or password.',
                    };
                default:
                    return {
                        message: 'Something went wrong.',
                    };
            }
        }

        // 3. Crucial: Re-throw non-AuthErrors (like Next.js redirect errors) so navigation succeeds
        throw error;
    }
    revalidatePath('/meetings');
    return {
        message: null,
        success: true,
    };
}

export async function signOutAction() {
    await signOut({
        redirectTo: '/',
    });
}