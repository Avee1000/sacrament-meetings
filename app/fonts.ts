import { Geist, Roboto } from "next/font/google";
export const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ['latin'],
  style: ['normal', 'italic'],
})

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});
