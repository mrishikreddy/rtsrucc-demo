import "./globals.css";
import Navbar from "./Navbar";
import { AuthProvider } from "./contexts/authContext";
import { DataProvider } from "./contexts/dataContext";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "SRU Coding Club Demo",
  description: "This is project is made by Rishik Reddy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>
        <AuthProvider>
        <DataProvider>
            <Navbar />
            {children}
        </DataProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
