"use client";

import React from 'react';
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export const ReduxProvider = ({ children, session }: { children: React.ReactNode, session: Session | null }) =>
{ 
    return <Provider store={store}><SessionProvider session={session}>{children}</SessionProvider></Provider>
};