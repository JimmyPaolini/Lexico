import { GetServerSideProps } from 'next'

import {
  CustomText,
  getCustomTextLocal,
} from 'src/components/library/custom/customTextsLocal'
import { useCustomTextQuery } from 'src/graphql/generated'

import CustomReaderNew from '../custom'

type Props = { id: string }

export default function CustomReaderEdit({ id }: Props) {
  const { data: userText, isSuccess } = useCustomTextQuery({ id })
  const localText = getCustomTextLocal(id)
  const text = (isSuccess ? userText : localText) as CustomText
  return !text ? <></> : <CustomReaderNew text={text} />
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { id: params?.customTextId } }
}
