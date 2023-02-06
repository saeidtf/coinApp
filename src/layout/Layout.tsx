import { useAppearance } from '@/providers/AppearanceProvider'
import { Box, Container, Divider, GlobalStyles, Stack, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import LayoutHeader from './components/LayoutHeader'

const Layout: React.FC<PropsWithChildren<object>> = ({ children }) => {
  const {translate} = useAppearance()
  return (
    <>
      <GlobalStyles
        styles={{
          a: { textDecoration: 'none', color: 'inherit' , transition: 'all 0.3s ease-in-out' },          
        }}
      />
      <Box sx={{ minHeight: '100vh' , direction:'ltr' }}>
        <Stack alignItems={'stretch'} sx={{ minHeight: '100vh' }} gap={2}>
          <Box flexShrink={0}>
            <LayoutHeader />
          </Box>
          <Container maxWidth="xl" sx={{ flexGrow: 1, flexShrink: 0, pt: 18 }}>
            {children}
          </Container>
          <Box flexShrink={0} height={50} textAlign="center" color="primary.light" >
            <Divider />
            <Typography variant="caption" component="div" mt={3}>
              {translate('copyRight')}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  )
}

export default Layout
