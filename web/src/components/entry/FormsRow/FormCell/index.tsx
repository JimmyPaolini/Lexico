import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'

import { Identifier } from '../../../../utils/identifiers'
import CenterText from './CenterText'
import Sidebar from './Sidebar'

export type FormCellPosition =
  | 'topLeftText'
  | 'topRightText'
  | 'midLeft'
  | 'midRight'
  | 'bottomLeftText'
  | 'bottomRightText'

export type Props = {
  position: FormCellPosition
  centerText: string
  topLeftText?: Identifier
  topRightText?: Identifier
  bottomLeftText?: Identifier
  bottomRightText?: Identifier
}

export default function FormCell({
  position,
  centerText,
  topLeftText,
  topRightText,
  bottomLeftText,
  bottomRightText,
}: Props) {
  const theme = useTheme()
  const borderRule = '1px solid rgba(255, 255, 255, 0.12)'

  return (
    <Tooltip
      title={centerText?.length > 20 ? centerText : ''}
      placement="top"
      enterDelay={0}
      // interactive
      arrow
      aria-label={centerText}
      sx={{
        ['&.MuiTooltip-tooltip']: {
          maxWidth: theme.custom.card.maxWidth / 2,
          fontSize: 14,
          textAlign: 'center',
        },
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        wrap="nowrap"
        sx={{
          background: theme.palette.background.paper,
          height: 48,
          position: 'relative',
          borderTop: position.match(/bottom|mid/i) ? borderRule : '',
          borderBottom: position.match(/top|mid/i) ? borderRule : '',
          borderRight: position.match(/Left/i) ? borderRule : '',
          borderLeft: position.match(/Right/i) ? borderRule : '',
        }}
      >
        <Sidebar top={topLeftText} bottom={bottomLeftText} side="left" />
        <CenterText centerText={centerText} />
        <Sidebar top={topRightText} bottom={bottomRightText} side="right" />
      </Grid>
    </Tooltip>
  )
}
