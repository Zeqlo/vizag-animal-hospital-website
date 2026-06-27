import { useState, useEffect, useCallback } from 'react'

/**
 * Generic hook to fetch data from an API endpoint.
 * Returns { data, loading, error, refetch }.
 * data starts as initialData so the page doesn't flash empty.
 */
export function useApiData<T>(endpoint: string, initialData: T): {
  data: T
  loading: boolean
  error: string
  refetch: () => Promise<void>
} {
  const [data, setData] = useState<T>(initialData)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const fetchData = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`)
      const json: T = await res.json()
      setData(json)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
      // Keep initialData on error — better than empty page
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    void fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}