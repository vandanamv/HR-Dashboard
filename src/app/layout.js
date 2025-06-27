// src/app/layout.js
import "./globals.css"; // Uncomment this if needed

export const metadata = {
  title: "HR Dashboard",
  description: "Track and manage employee performance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        {children}
      </body>
    </html>
  );
}
