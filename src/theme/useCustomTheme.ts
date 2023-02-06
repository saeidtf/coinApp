import { useAppearance } from '@/providers/AppearanceProvider'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { useRouter } from 'next/router'

function useCustomTheme() {
  const {themeMode} = useAppearance()
  const {locale} = useRouter()
  const isRTL = locale === 'fa' 

  const lightTheme = createTheme({
    palette: {
      mode: themeMode,
    },
    direction: isRTL ? 'rtl' : 'ltr',
    spacing: 4,
    shape: {
      borderRadius: 4,
    },
    typography: {
      fontFamily: [isRTL ? 'vazir' : 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            [`& a:hover`]: {
              color: '#c5cae9',
            },
          },
        },
      },
    },
  })

  return responsiveFontSizes(lightTheme)
}

export default useCustomTheme
