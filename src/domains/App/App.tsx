import { Layout as DefaultLayout } from '@/layout'
import { AppearanceProvider } from '@/providers/AppearanceProvider'
import { store } from '@/redux/store'
import MaterialProvider, { CustomStyledProvider } from '@/theme/MaterialProvider'
import createCache from '@emotion/cache'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { Provider } from 'react-redux'
import rtlPlugin from 'stylis-plugin-rtl'

export const createEmotionCache = (isRtl?: boolean) => {
  return createCache({
    key: isRtl ? 'muirtl' : 'muiltr',
    stylisPlugins: isRtl ? [rtlPlugin] : [],
    prepend: true,
  })
}

const App: React.FC<AppProps> = ({ Component, pageProps }: any) => {
  const { locale } = useRouter()
  const clientSideEmotionCache = useMemo(() => createEmotionCache(locale === 'fa'), [locale])
  const Layout = Component.Layout || DefaultLayout

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <MaterialProvider>
          <CustomStyledProvider cache={clientSideEmotionCache}>
            <Head>
              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
              />
            </Head>
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </CustomStyledProvider>
        </MaterialProvider>
      </AppearanceProvider>
    </Provider>
  )
}

export default App
