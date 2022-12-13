import { useMemo } from 'react'

import { useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import useMediaQuery from '@mui/material/useMediaQuery'

import LazyLoad from 'react-lazyload'

type Card = JSX.Element
type Props = { Cards: Card[] }

export const getCardKey = (Card: Card) =>
  Card.props?.entry?.id ?? JSON.stringify(Card.props)

export const Deck = ({ Cards }: Props) => {
  const theme = useTheme()
  const isXl = useMediaQuery(theme.breakpoints.up('xl'))
  const isLg = useMediaQuery(theme.breakpoints.up('lg'))
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const numCols = isXl ? 4 : isLg ? 3 : isMd ? 2 : 1

  const CardMatrix = useMemo<Card[][]>(
    () => arrangeCards(Cards, numCols),
    [Cards, numCols],
  )

  return !CardMatrix?.[0]?.length ? null : (
    <Grid
      container
      justifyContent="center"
      wrap="nowrap"
      gap={2}
      sx={{ margin: `0px ${theme.spacing(2)}` }}
    >
      {CardMatrix.map((CardCol, colNum) => {
        return !CardCol.length ? null : (
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            gap={2}
            sx={{ width: 'auto' }}
            key={CardCol.map((Card) => getCardKey(Card)).join()}
          >
            {CardCol.map((Card, rowNum) => (
              <Grow
                in
                key={getCardKey(Card)}
                timeout={Math.min(400 * Math.pow(colNum + rowNum, 1 / 2), 1000)}
              >
                <Grid item sx={{ width: '100%' }}>
                  <LazyLoad offset={100} throttle={50} height={28} once>
                    {Card}
                  </LazyLoad>
                </Grid>
              </Grow>
            ))}
          </Grid>
        )
      })}
    </Grid>
  )
}

function arrangeCards(Cards: Card[], numCols: number): Card[][] {
  if (!Array.isArray(Cards) || numCols <= 0) {
    return [[]]
  } else {
    return [...Array(numCols).keys()].map((_, colNum) =>
      Cards.filter((_, rowNum) => rowNum % numCols === colNum),
    )
  }
}
