import React, { useContext } from 'react'
import LazyLoad from 'react-lazyload'

import { Divider, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Line } from '../../graphql/generated'
import { getSettingsLocal } from '../../utils/settingsLocal'
import { normalize } from '../../utils/string'
import { Context } from '../layout/Context'
import ReaderWord from './ReaderWord'

const PREFIX = 'ReaderLine'

const classes = {
  lineLabel: `${PREFIX}-lineLabel`,
  divider: `${PREFIX}-divider`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.lineLabel}`]: {
    userSelect: 'none',
    pointerEvents: 'none',
    display: 'inline-block',
    height: '100%',
    marginRight: theme.spacing(1) - 2,
    marginLeft: theme.spacing(1) - 2,
    fontFamily: 'courier, monospace',
  },

  [`& .${classes.divider}`]: {
    display: 'inline',
    marginRight: theme.spacing(1) + 2,
    backgroundColor: theme.palette.primary.main,
  },
}))

type Props = {
  line: Line
  openModal: (word: string) => void
}

export default function ReaderLine({ line, openModal }: Props) {
  const { user } = useContext(Context)
  const words = normalize(line.line).match(/\w+|\W+/gi)
  const lineLabelFontSize =
    ((user?.settings?.fontSize || getSettingsLocal().fontSize) as number) - 3

  return (
    <StyledGrid container wrap="nowrap">
      <Typography
        className={classes.lineLabel}
        align="right"
        component="span"
        variant="inherit"
        style={{ fontSize: lineLabelFontSize }}
      >
        {line.lineLabel}
      </Typography>
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <LazyLoad
        offset={1000}
        throttle={50}
        height={28}
        style={{ display: 'inline' }}
        placeholder={
          <Typography component="span" variant="inherit">
            ...
          </Typography>
        }
      >
        {words?.map((word, i) => (
          <ReaderWord {...{ word, openModal }} key={line.id + i} />
        ))}
      </LazyLoad>
    </StyledGrid>
  )
}
