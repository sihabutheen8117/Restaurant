"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation" 
import { setRouter } from "../utils/axiosConfig" 
import getQueryClient from "./getQueryClient"

export default function QueryProvider({children} : {children: React.ReactNode}){
    const queryClient = getQueryClient()
    const router = useRouter()

    // Set up the router for axios interceptor
    useEffect(() => {
        setRouter(router)
    }, [router])

    return(
        <QueryClientProvider
        client={queryClient}
        >
            {children}
        </QueryClientProvider>
    )
}