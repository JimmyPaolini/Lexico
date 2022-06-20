import { Home } from "@material-ui/icons"
import { useDeleteCustomTextMutation } from "../../../../graphql/generated"
import {
  createCustomTextLocal,
  CustomText,
} from "../../../../utils/literatureLocal"
import CustomLiteratureMenuItem from "./CustomLiteratureMenuItem"

interface CustomLiteratureMoveToLocalProps {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
  closeMenu: () => void
}
export default function CustomLiteratureMoveToLocal({
  text,
  refreshCustomTexts,
  closeMenu,
}: CustomLiteratureMoveToLocalProps) {
  const { mutate: deleteCustomTextUser } = useDeleteCustomTextMutation({
    onMutate: closeMenu,
    onSettled: () => refreshCustomTexts(),
  })
  const moveToLocal = () => {
    createCustomTextLocal(text)
    deleteCustomTextUser(text)
  }

  return (
    <CustomLiteratureMenuItem
      action={moveToLocal}
      icon={<Home />}
      text="Move to Local"
    />
  )
}
