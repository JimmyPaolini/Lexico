import { Divider, Typography } from "@material-ui/core"
import { useFormik } from "formik"
import React, { useContext } from "react"
import { Settings, useSetSettingsMutation } from "../../../graphql/generated"
import useSnackbarEnhanced from "../../../hooks/useSnackbarEnhanced"
import {
  getSettingsLocal,
  setSettingsLocal,
  showSettingsInstructions,
} from "../../../utils/settingsLocal"
import { Context } from "../../layout/Context"
import SettingsSlider from "./SettingsSlider"
import SettingsSwitch from "./SettingsSwitch"

export default function SettingsForm() {
  const { user } = useContext(Context)

  const { enqueueSnackbar } = useSnackbarEnhanced()
  const formik = useFormik({
    initialValues: (user ? user.settings : getSettingsLocal()) as Settings,
    onSubmit: async () => {
      if (user) {
        await setSettingsUser({ settings: formik.values })
      } else {
        setSettingsLocal(formik.values)
        if (showSettingsInstructions()) {
          enqueueSnackbar(
            `Your settings are saved locally, sign in to save them across devices/browsers`,
            { autoHideDuration: 10000 },
          )
        }
      }
    },
  })

  const { mutateAsync: setSettingsUser } = useSetSettingsMutation()

  return (
    <form onChange={formik.handleSubmit}>
      <Divider />
      <SettingsSwitch
        field="translationsExpandedDefault"
        label="Translations expanded by default"
        formik={formik}
      />
      <Divider />
      <SettingsSwitch
        field="formsExpandedDefault"
        label="Forms expanded by default"
        formik={formik}
      />
      <Divider />
      <Typography align="center" style={{ marginTop: 10, marginBottom: 4 }}>
        Literature Reader font size:
      </Typography>
      <SettingsSlider formik={formik} />
    </form>
  )
}
