import {
  useEffect,
  useState
} from "react"

import {
  HIGHLIGHT_DURATION
} from "../constants/adminConfig"

function useHighlightOrder() {

  const [
    highlightId,
    setHighlightId
  ] = useState(null)

  useEffect(() => {

    const timeout =
      setTimeout(() => {

        setHighlightId(null)

      }, HIGHLIGHT_DURATION)

    return () =>
      clearTimeout(timeout)

  }, [highlightId])

  return {
    highlightId,
    setHighlightId
  }

}

export default useHighlightOrder