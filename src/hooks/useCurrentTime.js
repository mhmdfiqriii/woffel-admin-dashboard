import {
  useEffect,
  useState
} from "react"

import {
  CURRENT_TIME_INTERVAL
} from "../constants/adminConfig"

function useCurrentTime() {

  const [currentTime, setCurrentTime] =
    useState(() => Date.now())

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentTime(
          Date.now()
        )

      }, CURRENT_TIME_INTERVAL)

    return () =>
      clearInterval(interval)

  }, [])

  return currentTime

}

export default useCurrentTime