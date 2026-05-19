import {
  useEffect,
  useState
} from "react"

import {
  SEARCH_DEBOUNCE
} from "../constants/adminConfig"

function useDebounce(
  value,
  delay = SEARCH_DEBOUNCE
) {

  const [
    debouncedValue,
    setDebouncedValue
  ] = useState(value)

  useEffect(() => {

    const timeout =
      setTimeout(() => {

        setDebouncedValue(value)

      }, delay)

    return () =>
      clearTimeout(timeout)

  }, [
    value,
    delay
  ])

  return debouncedValue

}

export default useDebounce