"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

export function useCase(caseId: string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCase = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/cases/${caseId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch case")
      }
      const result = await response.ok ? await response.json() : null
      setData(result)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }, [caseId])

  const updateCase = async (updateData: any) => {
    try {
      const response = await fetch(`/api/cases/${caseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        throw new Error("Failed to update case")
      }

      const result = await response.json()
      setData(result)
      toast.success("Case updated successfully")
      return result
    } catch (err: any) {
      toast.error(err.message)
      throw err
    }
  }

  useEffect(() => {
    if (caseId) {
      fetchCase()
    }
  }, [caseId, fetchCase])

  return { data, loading, error, refresh: fetchCase, updateCase }
}
