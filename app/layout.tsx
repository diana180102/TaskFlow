import type { Metadata } from "next";
// import localFont from "next/font/local";
import { monserrat } from "@/ui/fonts";
import { Provider } from 'react-redux'
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { store } from "@/redux/store";
config.autoAddCss = false



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ `${monserrat.className} min-w-80 min-h-full`}>

        <Provider store={store}>

        {children}
        </Provider>
      </body>
    </html>
  );
}
