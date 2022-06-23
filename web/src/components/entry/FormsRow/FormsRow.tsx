import { useContext, useState } from 'react'

import {
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { Forms } from '../../../graphql/generated'
import { getSettingsLocal } from '../../../utils/settingsLocal'
import ExpandIcon from '../../accessories/ExpandIcon'
import IdentifierPill from '../../accessories/IdentifierPill'
import { Context } from '../../layout/Context'
import AdjectiveForms from './PartsOfSpeech/AdjectiveFormsTable'
import NounForms from './PartsOfSpeech/NounFormsTable'
import VerbForms from './PartsOfSpeech/VerbFormsTable'

const PREFIX = 'FormsRow'

const classes = {
  formsRow: `${PREFIX}-formsRow`,
  hide: `${PREFIX}-hide`,
  identifiers: `${PREFIX}-identifiers`,
  expandIcon: `${PREFIX}-expandIcon`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.formsRow}`]: {
    background: theme.palette.background.paper,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '&:last-child': {
      paddingBottom: theme.spacing(1),
    },
  },

  [`& .${classes.hide}`]: {
    display: 'none',
  },

  [`& .${classes.identifiers}`]: {
    marginTop: theme.spacing(1),
  },

  [`& .${classes.expandIcon}`]: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(1.5),
  },
}))

type Props = {
  searched: string
  forms?: Forms | null
  partOfSpeech: string
  identifiers: string[]
}

export default function FormsRow({
  searched,
  forms,
  partOfSpeech,
  identifiers: identifiersList = [],
}: Props) {
  const { user } = useContext(Context)
  const expandedInitial =
    user?.settings?.formsExpandedDefault ||
    getSettingsLocal().formsExpandedDefault ||
    false
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)

  if (!searched)
    searched =
      partOfSpeech === 'verb' ? 'Conjugation Table' : 'Declension Table'

  const FormsCard = !forms ? null : partOfSpeechToFormsCard[partOfSpeech]

  const expandable = !!FormsCard

  if (searched.match(/Table/i) && !expandable) return <Root></Root>

  return (
    <>
      <Divider variant="inset" />
      <CardContent className={classes.formsRow}>
        <CardActionArea
          onClick={() => setExpanded((expanded) => !expanded)}
          disabled={!expandable}
          disableRipple
          disableTouchRipple
          classes={{ focusHighlight: classes.hide }}
        >
          <Grid container wrap="nowrap">
            <Grid container item direction="column">
              <Grid item>
                <Typography variant="body1">{searched}</Typography>
              </Grid>
              {identifiersList.map((identifiers) => (
                <Grid
                  container
                  item
                  key={identifiers}
                  className={classes.identifiers}
                >
                  {identifiers.split(' ').map((identifier) => (
                    <IdentifierPill identifier={identifier} key={identifier} />
                  ))}
                </Grid>
              ))}
            </Grid>
            {FormsCard && (
              <Grid item className={classes.expandIcon}>
                <ExpandIcon {...{ expanded }} />
              </Grid>
            )}
          </Grid>
        </CardActionArea>
      </CardContent>
      {FormsCard && (
        <Collapse in={expanded && !!FormsCard} mountOnEnter>
          <Divider variant="inset" />
          <FormsCard forms={forms} />
        </Collapse>
      )}
    </>
  )
}

const partOfSpeechToFormsCard = {
  verb: VerbForms,
  noun: NounForms,
  properNoun: NounForms,
  adjective: AdjectiveForms,
  participle: AdjectiveForms,
  suffix: AdjectiveForms,
  numeral: AdjectiveForms,
  pronoun: AdjectiveForms,
  determiner: AdjectiveForms,
} as {
  [key: string]: typeof VerbForms | typeof NounForms | typeof AdjectiveForms
}
