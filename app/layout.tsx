import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"10 African Folktales | Dr Indah Elizabeth Barika Ebnchenge",description:"A timeless journey of African stories, wisdom, adventure and values."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
