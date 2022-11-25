import { forwardRef, useState } from 'react'

import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { AdjectiveFormsTable } from '../Entry/Forms/PartsOfSpeech/AdjectiveFormsTable'
import { PrincipalParts } from '../Entry/PrincipalParts/PrincipalParts'
import adjectiveDeclensions from './adjectiveDeclensions'

type Props = {
  declension: typeof adjectiveDeclensions[0]
  expandedInitial?: boolean
}
export default forwardRef(function AdjectiveDeclensionCard(
  { declension, expandedInitial = false }: Props,
  ref,
) {
  const theme = useTheme()
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)

  return (
    <Card ref={ref}>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disableRipple
        disableTouchRipple
      >
        <PrincipalParts {...{ ...declension, expanded }} />
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
          <Typography align="center" sx={{ margin: theme.spacing(2) }}>
            {declension.info}
          </Typography>
          <Divider variant="middle" />
          <AdjectiveFormsTable {...declension} />
        </CardContent>
      </Collapse>
    </Card>
  )
})
