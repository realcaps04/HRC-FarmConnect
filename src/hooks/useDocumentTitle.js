import { useEffect } from 'react'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · HRC Farmer Companion` : 'HRC Farmer Companion'
  }, [title])
}
