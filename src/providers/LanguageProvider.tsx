import React from 'react'
import fa from '@/locales/fa.json'
import en from '@/locales/en.json'
import { useRouter } from 'next/router'

type LanguageText = keyof typeof fa | keyof typeof en
type LanguageContextType = {
  translate: (key: LanguageText) => string
}
const LanguageContext = React.createContext({} as LanguageContextType)
export const useLanguage = () => React.useContext(LanguageContext)

export const LanguageProvider = ({ children }: any) => {
  const { locale } = useRouter()

  const translate = (key: LanguageText): string => {
    if (locale === 'fa') {
      return fa[key] as string
    } else {
      return en[key] as string
    }
  }

  return (
    <LanguageContext.Provider value={{ translate }}>
      {children}
    </LanguageContext.Provider>
  )
}
