// 'use client'

// import { createContext, useState, useCallback, useEffect } from 'react'
// import { usePathname } from 'next/navigation'
// import LoadingView from '@/views/LoadingView'

// interface LoadingContextType {
//   startLoading: () => void
//   stopLoading: () => void
// }

// export const LoadingContext = createContext<LoadingContextType>({
//   startLoading: () => {},
//   stopLoading: () => {},
// })

// export function LoadingProvider({ children }: { children: React.ReactNode }) {
//   const [isLoading, setIsLoading] = useState(false)
//   const pathname = usePathname()

//   const startLoading = useCallback(() => setIsLoading(true), [])
//   const stopLoading = useCallback(() => setIsLoading(false), [])

//   useEffect(() => {
//     setIsLoading(false)
//   }, [pathname])

//   return (
//     <LoadingContext.Provider value={{ startLoading, stopLoading }}>
//       {isLoading && <LoadingView />}
//       {children}
//     </LoadingContext.Provider>
//   )
// }
'use client'

import { createContext, useState, useCallback, useEffect, useRef } from 'react'
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
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startLoading = useCallback(() => {
    setIsLoading(true)
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const stopLoading = useCallback(() => {
    setVisible(false)
    timeoutRef.current = setTimeout(() => setIsLoading(false), 300)
  }, [])

  useEffect(() => {
    stopLoading()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [pathname, stopLoading])

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      {isLoading && <LoadingView visible={visible} />}
      {children}
    </LoadingContext.Provider>
  )
}
