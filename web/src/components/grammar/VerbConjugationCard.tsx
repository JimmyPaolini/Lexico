import { forwardRef, useState } from 'react'

import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  useTheme,
} from '@mui/material'

import VerbForms from '../entry/FormsRow/PartsOfSpeech/VerbFormsTable'
import PrincipalPartsRow from '../entry/PrincipalPartsRow/PrincipalPartsRow'
import verbConjugations from './verbConjugations'

type Props = {
  conjugation: typeof verbConjugations[0]
  expandedInitial?: boolean
}

export default forwardRef(function VerbConjugationCard(
  { conjugation, expandedInitial = false }: Props,
  ref,
) {
  const theme = useTheme()
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)

  return (
    <Card sx={{ margin: theme.spacing(1) }} ref={ref}>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        sx={{
          '& .MuiCardActionArea-focusHighlight': {
            display: 'hide',
          },
        }}
        disableRipple
        disableTouchRipple
      >
        <PrincipalPartsRow {...{ ...conjugation, expanded }} />
      </CardActionArea>
      <Collapse in={expanded} mountOnEnter>
        <CardContent
          sx={{
            padding: 0,
            '&:last-child': {
              padding: 0,
            },
          }}
        >
          <Divider variant="middle" />
          <VerbForms {...conjugation} />
        </CardContent>
      </Collapse>
    </Card>
  )
})
