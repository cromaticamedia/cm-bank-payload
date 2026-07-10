'use client'

import { createContext, useState, useCallback, useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import LoadingView from '@/views/LoadingView'

interface LoadingContextType {
  startLoading: () => void
  stopLoading: () => void
}

export const LoadingContext = createContext<LoadingContextType>({
  startLoading: () => {},
  stopLoading: () => {},
})

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstRender = useRef(true)

  const startLoading = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsLoading(true)
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const stopLoading = useCallback(() => {
    setVisible(false)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setIsLoading(false), 300)
  }, [])

  // Auto-clear the loader whenever the full URL (path OR query) changes,
  // i.e. when a navigation actually commits. Skip the initial mount.
  const urlKey = `${pathname}?${searchParams.toString()}`

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    stopLoading()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [urlKey, stopLoading])

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      {isLoading && <LoadingView visible={visible} />}
      {children}
    </LoadingContext.Provider>
  )
}
