import {
  useEffect,
  useRef,
  useState
} from "react"

function useAdminSound() {

  const [soundOn, setSoundOn] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "sound"
        )

      return saved !== null
        ? saved === "true"
        : true

    })

  const audioRef =
    useRef(null)

  const prosesAudioRef =
    useRef(null)

  const doneAudioRef =
    useRef(null)

  useEffect(() => {

    localStorage.setItem(
      "sound",
      soundOn
    )

  }, [soundOn])

  useEffect(() => {

    audioRef.current =
      new Audio(
        "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/sounds/adm-notif.mp3"
      )

    prosesAudioRef.current =
      new Audio(
        "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/sounds/adm-pending.mp3"
      )

    doneAudioRef.current =
      new Audio(
        "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/sounds/adm-done.mp3"
      )

  }, [])

  const playNewOrder =
    () => {

      if (
        soundOn &&
        audioRef.current
      ) {

        audioRef.current.currentTime =
          0

        audioRef.current
          .play()
          .catch(() => {})

      }

    }

  const playProses =
    () => {

      if (
        soundOn
      ) {

        prosesAudioRef.current
          ?.play()
          .catch(() => {})

      }

    }

  const playDone =
    () => {

      if (
        soundOn
      ) {

        doneAudioRef.current
          ?.play()
          .catch(() => {})

      }

    }

  return {

    soundOn,
    setSoundOn,

    playNewOrder,
    playProses,
    playDone

  }

}

export default useAdminSound