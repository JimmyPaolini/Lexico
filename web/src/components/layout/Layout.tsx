import React, { PropsWithChildren } from 'react'

import { Grid } from '@mui/material'

import Navigation from './Navigation'
import Snackbar from './Snackbar'

type Props = PropsWithChildren<{}>

export default function Layout({ children }: Props) {
  return (
    <Snackbar>
      <Grid container>
        <Grid item>
          <Navigation />
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
    </Snackbar>
  )
}
