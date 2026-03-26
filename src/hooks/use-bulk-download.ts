"use client"

import { useState } from "react"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { toast } from "sonner"

export function useBulkDownload(caseId: string, caseName: string) {
  const [downloading, setDownloading] = useState(false)

  const downloadAll = async (documents: any[]) => {
    if (!documents || documents.length === 0) {
      toast.error("No documents to download")
      return
    }

    try {
      setDownloading(true)
      const zip = new JSZip()
      const folder = zip.folder(`Documents_${caseId}`)

      toast.info(`Preparing ${documents.length} files...`)

      const fetchPromises = documents.map(async (doc) => {
        if (!doc.view_url) return
        
        try {
          const response = await fetch(doc.view_url)
          const blob = await response.blob()
          folder?.file(doc.file_name, blob)
        } catch (err) {
          console.error(`Failed to fetch ${doc.file_name}`, err)
        }
      })

      await Promise.all(fetchPromises)

      const content = await zip.generateAsync({ type: "blob" })
      saveAs(content, `Bluedot_${caseName}_Documents.zip`)
      toast.success("Archive generated successfully")
    } catch (err: any) {
      toast.error(`Download failed: ${err.message}`)
    } finally {
      setDownloading(false)
    }
  }

  return { downloadAll, downloading }
}
