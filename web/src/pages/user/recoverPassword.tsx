import React from "react"
import SingleCardLayout from "../../components/layout/SingleCardLayout"
import RecoverPasswordCard from "../../components/user/login/RecoverPasswordCard"

export default function RecoverPassword(): JSX.Element {
  return (
    <SingleCardLayout>
      <RecoverPasswordCard />
    </SingleCardLayout>
  )
}
