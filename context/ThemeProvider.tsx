'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'

interface ThemeContextType {
  mode: string
  setMode: (mode: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState('')

  const handleThemeChange = () => {
    if (mode === 'dark') {
      setMode('light')
      document.documentElement.classList.remove('light')
    } else {
      setMode('dark')
      document.documentElement.classList.add('dark')
    }
  }

  useEffect(() => {
    handleThemeChange()
  }, [mode])

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
