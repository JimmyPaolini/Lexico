import { makeStyles } from "@material-ui/core/styles"
import { ExpandMore } from "@material-ui/icons"

interface Props {
  expanded: boolean
  [key: string]: any
}
export default function ExpandIcon({ expanded, ...props }: Props): JSX.Element {
  const classes = useStyles()
  const direction = expanded ? classes.upSideDown : classes.rightSideUp
  return (
    <ExpandMore className={direction} {...props} />
  )
}

const useStyles = makeStyles(() => ({
  rightSideUp: {
    transition: "250ms ease",
    transform: "rotateZ(0deg)",
  },
  upSideDown: {
    transition: "250ms ease",
    transform: "rotateZ(-180deg)",
  },
}))
