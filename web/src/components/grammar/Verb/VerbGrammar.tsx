import { useState } from 'react'

import { Card, Divider, Tab, Tabs, Typography } from '@mui/material'

import { VerbFormsTable } from 'src/components/Entry/Forms/PartsOfSpeech/VerbFormsTable'

import { CollapsibleCardHeader } from '../../accessories/CollapsibleCardHeader'
import { verbGrammarData } from './VerbConjugationCard.constants'

type Props = {
  expandedInitial?: boolean
}

export const VerbGrammar = ({ expandedInitial = false }: Props) => {
  const [tab, setTab] = useState(0)

  return (
    <Card key="verb">
      <CollapsibleCardHeader
        expandedInitial={expandedInitial}
        title={'Verbs'}
        subheader={'Conjugations, Endings, Translations'}
        cardContentProps={{
          sx: { padding: 0, '&:last-child': { padding: 0 } },
        }}
      >
        <Divider variant="middle" />
        <Tabs
          value={tab}
          onChange={(_: unknown, tab: number) => setTab(tab)}
          textColor="secondary"
          indicatorColor="secondary"
        >
          {verbGrammarData.map((verbConjugationCardData) => (
            <Tab
              key={verbConjugationCardData.id}
              label={verbConjugationCardData.id}
              sx={{ minWidth: 0 }}
            />
          ))}
        </Tabs>
        <Typography align="center" variant="h6">
          {verbGrammarData[tab].title}
        </Typography>
        <Typography align="center" variant="subtitle1" gutterBottom>
          {verbGrammarData[tab].description}
        </Typography>
        <VerbFormsTable forms={verbGrammarData[tab].forms} />
      </CollapsibleCardHeader>
    </Card>
  )
}
