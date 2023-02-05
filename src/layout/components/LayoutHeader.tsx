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
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import HideOnScroll from './HideOnScroll'

const links = [
  { to: '/', label: 'Home' },
  { to: '/contact', label: 'Contact' },
  { to: '/about', label: 'About' },
]

export default function LayoutHeader() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <>
      <HideOnScroll>
        <AppBar color="primary" component={'nav'} sx={{ flexShrink: 0 }}>
          <Toolbar>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
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
              <Box
                sx={{
                  flexGrow: {
                    xs: 1,
                  },
                }}
              >
                <Link href="/">
                  <Typography variant="h6" textAlign={'center'}>
                    Mofid Crypto
                  </Typography>
                </Link>
              </Box>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <Box gap={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {links.map((link, index) => (
                <React.Fragment key={index}>
                  <Link href={link.to}>{link.label}</Link>
                </React.Fragment>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <SwipeableDrawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        onOpen={() => setOpenMenu(true)}
        anchor="left"
      >
        <Box width={300} height="100vh" textAlign="center" role="presentation">
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
