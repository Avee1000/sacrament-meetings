import Link from 'next/link'

export default function LoginSignup() {
    return (
        <div className="flex items-center gap-2 mr-2">
            <Link href="/signup" className="inline-flex bg-white text-black py-1.5 px-4 rounded-full text-sm font-semibold border-2 border-white hover:bg-gray-100 transition-colors">
                Sign Up
            </Link>
            <Link href="/login" className="inline-flex py-1.5 px-4 rounded-full text-sm font-semibold border-2 border-white hover:bg-white hover:text-gray-900 transition-colors">
                Log In
            </Link>
        </div>
    )
}