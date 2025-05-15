"use client"

import { useEffect, useState } from "react"
import Header from "./header"
import ContainerList from "./container-list"
import type { Container } from "@/types/container"
import useWebSocket from "@/hooks/use-websocket"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Dashboard() {
  const [containers, setContainers] = useState<Container[]>([])
  const { data, isConnected, error } = useWebSocket()

  useEffect(() => {
    if (data) {
      setContainers(data as Container[])
    }
  }, [data])

  return (
    <div className="flex flex-col min-h-screen">
      <Header isConnected={isConnected} />
      <div className="container mx-auto px-4 py-6">
        {error && (
          <Alert
            variant="destructive"
            className="mb-6 animate-in fade-in slide-in-from-top-5 duration-300 border-l-4 border-red-500 bg-red-100 dark:bg-red-900/50 text-red-900 dark:text-red-100"
          >
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-red-600 dark:text-red-400" />
              <div>
                <AlertTitle className="text-lg font-semibold mb-1">Connection Error</AlertTitle>
                <AlertDescription className="text-sm">
                  Unable to connect to the Docker monitoring service:{" "}
                  <span className="font-mono bg-red-200 dark:bg-red-800 px-1 py-0.5 rounded">{error.message}</span>
                  <div className="mt-2 text-xs opacity-90">
                    Check that your WebSocket server is running and accessible.
                  </div>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        {!isConnected && !error && (
          <Alert className="mb-6 animate-in fade-in slide-in-from-top-5 duration-300 border-l-4 border-blue-500 bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100">
            <div className="flex items-start">
              <div className="mr-3 flex-shrink-0 mt-0.5">
                <div className="h-5 w-5 rounded-full border-2 border-blue-600 dark:border-blue-400 border-t-transparent animate-spin"></div>
              </div>
              <div>
                <AlertTitle className="text-lg font-semibold mb-1">Connecting to Docker Service</AlertTitle>
                <AlertDescription className="text-sm">
                  Attempting to establish a connection to the WebSocket server...
                  <div className="mt-2 text-xs opacity-90">This may take a few moments. Please wait.</div>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        {isConnected && containers.length > 0 && (
          <Alert className="mb-6 animate-in fade-in slide-in-from-top-5 duration-300 border-l-4 border-emerald-500 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-100">
            <div className="flex items-start">
              <div className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-3 mt-0.5 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <AlertTitle className="text-lg font-semibold mb-1">Connected Successfully</AlertTitle>
                <AlertDescription className="text-sm">
                  Monitoring your Docker containers in real-time.
                  <div className="mt-2 text-xs opacity-90">Data is being updated automatically as it arrives.</div>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Container Overview</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">{containers.length} containers</div>
              </div>
              <ContainerList containers={containers} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
