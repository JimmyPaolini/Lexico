import React from 'react'

import {
  AccountBalance,
  AccountCircle,
  Bookmark,
  Edit,
  MenuBook,
  Search,
} from '@mui/icons-material'

export default [
  {
    Name: 'Search',
    name: 'search',
    icon: <Search />,
    keybind: 's',
  },
  {
    Name: 'Bookmarks',
    name: 'bookmarks',
    icon: <Bookmark />,
    keybind: 'b',
  },
  {
    Name: 'Literature',
    name: 'literature',
    icon: <MenuBook />,
    keybind: 'l',
  },
  {
    Name: 'Grammar',
    name: 'grammar',
    icon: <Edit />,
    keybind: 'g',
  },
  {
    Name: 'User',
    name: 'user',
    icon: <AccountCircle />,
    keybind: 'u',
  },
  {
    Name: 'About',
    name: 'about',
    icon: <AccountBalance />,
    keybind: 'a',
  },
]
