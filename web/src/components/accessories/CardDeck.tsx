import React, { memo, useEffect, useState } from 'react'

import { useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import useMediaQuery from '@mui/material/useMediaQuery'

import LazyLoad from 'react-lazyload'

type Card = {
  key: string | number
  Card: JSX.Element
}

type Props = { cards: Card[] }

export default memo(function CardDeck({ cards }: Props) {
  const theme = useTheme()
  let numCols = 1
  if (useMediaQuery(theme.breakpoints.up('md'))) numCols = 2
  if (useMediaQuery(theme.breakpoints.up('lg'))) numCols = 3
  if (useMediaQuery(theme.breakpoints.up('xl'))) numCols = 4

  const [columns, setColumns] = useState<Card[][]>([[]])

  useEffect(() => {
    setColumns(arrangeCards(cards, numCols))
  }, [cards, numCols])

  if (!cards.every((card) => card.key && card.Card)) {
    console.error('Invalid card structure passed into CardDeck')
    return <></>
  }
  if (!columns.length || !columns[0].length) return <></>
  return (
    <Grid>
      {columns.map((column, col) => {
        if (!column.length) return null
        return (
          <Grid
            item
            container
            direction="column"
            alignItems="stretch"
            sx={{
              maxWidth: theme.custom.cardWidth + theme.spacing(2),
              minWidth: theme.custom.cardWidth - parseInt(theme.spacing(2)),
              outline: 'none',
            }}
            key={column.map((card) => card.key).join()}
          >
            {column.map((card, row) => {
              const timeout = Math.min(400 * Math.pow(col + row, 1 / 2), 1000)
              return (
                <Grow in timeout={timeout}>
                  <Grid item key={card.key}>
                    <LazyLoad offset={100} throttle={50} height={28} once>
                      {card.Card}
                    </LazyLoad>
                  </Grid>
                </Grow>
              )
            })}
          </Grid>
        )
      })}
    </Grid>
  )
})

function arrangeCards(cards: Card[], numCols: number): any {
  if (!Array.isArray(cards) || numCols <= 0) {
    return [[]]
  } else {
    return [...Array(numCols).keys()].map((_, col) =>
      cards.filter((_, row) => row % numCols === col),
    )
  }
}
