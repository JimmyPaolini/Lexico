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

import NounForms from '../Entry/Forms/PartsOfSpeech/NounFormsTable'
import PrincipalPartsRow from '../Entry/PrincipalParts/PrincipalParts'
import nounDeclensions from './nounDeclensions'

type Props = {
  declension: typeof nounDeclensions[0]
  expandedInitial: boolean
}

export default forwardRef(function NounDeclensionCard(
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
        <PrincipalPartsRow {...{ ...declension, expanded }} />
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
          <NounForms {...declension} />
        </CardContent>
      </Collapse>
    </Card>
  )
})
