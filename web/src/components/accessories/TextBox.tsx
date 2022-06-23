import { ComponentProps, MutableRefObject, forwardRef } from 'react'

import { TextField } from '@mui/material'

import { sentenceCase } from '../../utils/string'

type Props = {
  formik: any
  name: string
} & ComponentProps<typeof TextField>

const TextBox = forwardRef(
  (
    { formik, name, ...props }: Props,
    ref:
      | ((instance: HTMLDivElement | null) => void)
      | MutableRefObject<HTMLDivElement | null>
      | null,
  ) => {
    return (
      <TextField
        variant="outlined"
        fullWidth
        id={name}
        name={name}
        label={sentenceCase(name)}
        ref={ref}
        {...props}
        value={formik.values[name]}
        onChange={formik.handleChange}
        error={formik.touched[name] && !!formik.errors[name]}
        helperText={formik.touched[name] && formik.errors[name]}
      />
    )
  },
)
TextBox.displayName = 'TextBox'

export default TextBox
