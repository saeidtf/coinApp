import React from 'react'
import fa from '@/locales/fa.json'
import en from '@/locales/en.json'
import { useRouter } from 'next/router'

type LanguageText = keyof typeof en
type AppearanceContextType = {
  translate: (key: LanguageText) => string
  themeMode: 'light' | 'dark'
  setThemeMode: (mode: 'light' | 'dark') => void
}
const AppearanceContext = React.createContext({} as AppearanceContextType)
export const useAppearance = () => React.useContext(AppearanceContext)

export const AppearanceProvider = ({ children }: any) => {
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>('light')
  const { locale } = useRouter()

  const translate = (key: LanguageText): string => {
    if (locale === 'fa') {
      return fa[key] as string
    } else {
      return en[key] as string
    }
  }

  return (
    <AppearanceContext.Provider value={{ translate , themeMode , setThemeMode }}>
      {children}
    </AppearanceContext.Provider>
  )
}
