'use client'

import { createContext, useState, useCallback, useEffect } from 'react'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()

  const startLoading = useCallback(() => setIsLoading(true), [])
  const stopLoading = useCallback(() => setIsLoading(false), [])

  useEffect(() => {
    setIsLoading(false)
  }, [pathname])

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      {isLoading && <LoadingView />}
      {children}
    </LoadingContext.Provider>
  )
}
