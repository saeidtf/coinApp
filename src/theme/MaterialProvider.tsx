import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import lightTheme from './theme'

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
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  )
}
