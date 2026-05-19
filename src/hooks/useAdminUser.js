import {
  useEffect,
  useState
} from "react"

import {
  fetchCurrentAdminProfile
} from "../services/adminProfileService"

function useAdminUser() {

  const [adminUser, setAdminUser] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const loadProfile =
      async () => {

        const result =
          await fetchCurrentAdminProfile()

        if (
          result.success &&
          result.data?.is_active
        ) {

          setAdminUser(result.data)

        } else {

          setAdminUser(null)

        }

        setLoading(false)

      }

    loadProfile()

  }, [])

  return {
    adminUser,

    displayName:
      adminUser?.display_name ||
      adminUser?.email?.split("@")[0] ||
      "Admin",

    role:
      adminUser?.role ||
      "staff",

    loading
  }

}

export default useAdminUser