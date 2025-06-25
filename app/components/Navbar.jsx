'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';

const pages = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'EPIC', path: '/epic/2024-05-30' },
  { label: 'APOD', path: '/nasa/apod' },
  { label: 'Blogs', path: '/blogs' },
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const router = useRouter();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleRedirect = (path) => {
    router.push(path);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          NASA App
        </Typography>
       <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
  {pages.map((page) => (
    <Button
      key={page.path}
      onClick={() => handleRedirect(page.path)}
      sx={{ color: 'white' }}
    >
      {page.label}
    </Button>
  ))}
</Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
            {pages.map((page) => (
              <MenuItem key={page.path} onClick={() => handleRedirect(page.path)}>
                {page.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
