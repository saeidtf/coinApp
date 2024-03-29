import { useAppearance } from '@/providers/AppearanceProvider'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material'
import { log } from 'console'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { BsMoonStars, BsSun } from 'react-icons/bs'

import HideOnScroll from './HideOnScroll'

export default function LayoutHeader() {
  const [openMenu, setOpenMenu] = useState(false)

  const { translate, themeMode, setThemeMode } = useAppearance()

  const links = [
    { to: '/', label: translate('home') },
    { to: '/contact', label: translate('contact') },
    { to: '/about', label: translate('about') },
  ]

  const { locale, push, pathname } = useRouter()
  const isRtl = locale === 'fa'

  const handleChangeLocal = () => {
    push(pathname, pathname, { locale: !isRtl ? 'fa' : 'en' })
  }

  const handleChangeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <HideOnScroll>
        <AppBar color="primary" component={'nav'} sx={{ flexShrink: 0, direction: 'ltr' }}>
          <Toolbar>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                width: {
                  xs: '100%',
                  md: 'auto',
                },
              }}
            >
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton color="inherit" onClick={() => setOpenMenu(true)}>
                  <HiMenu size={24} />
                </IconButton>
              </Box>
              <Box gap={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
                {links.map((link, index) => (
                  <React.Fragment key={index}>
                    <Link href={link.to}>{link.label}</Link>
                  </React.Fragment>
                ))}
              </Box>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box>
                <IconButton onClick={handleChangeLocal}>
                  <Avatar sx={{ width: 30, height: 30 }}>
                    <Typography variant="button">{!isRtl ? 'Fa' : 'En'}</Typography>
                  </Avatar>
                </IconButton>
              </Box>
              <Box>
                <IconButton color="inherit" onClick={handleChangeMode}>
                  {themeMode === 'light' ? <BsMoonStars size={24} /> : <BsSun size={24} />}
                </IconButton>
              </Box>
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <SwipeableDrawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        onOpen={() => setOpenMenu(true)}
        anchor="left"
      >
        <Box width={300} height="100vh" sx={{ direction: 'ltr' }} role="presentation">
          <Stack spacing={4} mt={4}>
            <Avatar sx={{ width: 100, height: 100, m: 'auto' }} />
            <Divider />
            <List onClick={() => setOpenMenu(false)}>
              {links.map((link) => (
                <ListItem key={link.to} disablePadding>
                  <ListItemButton component={Link} href={link.to}>
                    <Typography variant="h6">{link.label}</Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
