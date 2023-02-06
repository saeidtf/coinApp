import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import React, { ReactNode } from 'react'
import useCustomTheme from './useCustomTheme'

type PropsType = {
  children: React.ReactNode
}

export const CustomStyledProvider = ({
  children,
  cache,
}: {
  children?: ReactNode
  cache: EmotionCache
}): JSX.Element => {
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </StyledEngineProvider>
  )
}

export default function MaterialProvider(props: PropsType) {
  const lightTheme = useCustomTheme()
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  )
}
