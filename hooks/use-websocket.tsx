"use client"

import { useState, useEffect, useRef } from "react"

interface WebSocketHookResult {
  data: any | null
  isConnected: boolean
  error: Error | null
}

export default function useWebSocket(url = "ws://localhost:8080/socket"): WebSocketHookResult {
  const [data, setData] = useState<any | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket(url)
    wsRef.current = socket

    // Connection opened
    socket.addEventListener("open", () => {
      console.log("WebSocket connection established")
      setIsConnected(true)
      setError(null)
    })

    // Listen for messages
    socket.addEventListener("message", (event) => {
      try {
        const parsedData = JSON.parse(event.data)
        setData(parsedData)
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err)
        setError(new Error("Failed to parse WebSocket message"))
      }
    })

    // Connection closed
    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed", event)
      setIsConnected(false)

      if (!event.wasClean) {
        setError(new Error(`WebSocket connection closed unexpectedly: code ${event.code}`))
      }
    })

    // Connection error
    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event)
      setError(new Error("WebSocket connection error"))
      setIsConnected(false)
    })

    // Cleanup on unmount
    return () => {
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close()
      }
    }
  }, [url])

  return { data, isConnected, error }
}
