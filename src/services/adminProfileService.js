import {
  supabase
} from "../lib/supabase"

export const fetchCurrentAdminProfile =
  async () => {

    const {
      data: authData,
      error: authError
    } = await supabase.auth.getUser()

    if (
      authError ||
      !authData.user
    ) {

      return {
        success: false,
        data: null,
        error: authError
      }

    }

    const {
      data,
      error
    } = await supabase

      .from("admin_profiles")

      .select(`
        id,
        email,
        role,
        display_name,
        avatar,
        is_active
      `)

      .eq("id", authData.user.id)

      .single()

    if (error) {

      return {
        success: false,
        data: null,
        error
      }

    }

    return {
      success: true,
      data,
      error: null
    }

  }