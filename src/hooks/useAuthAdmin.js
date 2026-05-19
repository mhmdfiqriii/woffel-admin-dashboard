import {
  useEffect
} from "react"

import {
  supabase
} from "../lib/supabase"

function useAuthAdmin(
  navigate
) {

  useEffect(() => {

    const checkUser =
      async () => {

        const { data } =

          await supabase.auth
            .getSession()

        if (
          !data.session
        ) {

          navigate("/login")

          return

        }

        localStorage.setItem(
          "admin_user",
          data.session.user.email
        )

      }

    checkUser()

  }, [navigate])

}

export default useAuthAdmin