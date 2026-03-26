"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { DOCUMENT_TYPES } from "@/lib/constants"
import { FileIcon, UploadIcon, CheckCircle2, XCircle, Loader2, Download, ShieldCheck, FileText, AlertCircle, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import { useBulkDownload } from "@/hooks/use-bulk-download"
import { cn } from "@/lib/utils"

interface DocumentsTabProps {
  data: any
  onUpdate: (update: any) => Promise<any>
}

export function DocumentsTab({ data, onUpdate }: DocumentsTabProps) {
  const { downloadAll, downloading: isZipping } = useBulkDownload(data?.case_id, data?.patient_name)
  const [uploading, setUploading] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTypeId, setActiveTypeId] = useState<string | null>(null)

  const documents = data?.documents || []

  const getDocForType = (typeId: string) => {
    return documents.find((d: any) => d.document_type === typeId)
  }

  const handleUploadClick = (typeId: string) => {
    setActiveTypeId(typeId)
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !activeTypeId) return

    try {
      setUploading(activeTypeId)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("documentType", activeTypeId)

      const response = await fetch(`/api/cases/${data.id}/documents`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      await onUpdate({ _refresh: Date.now() })
      toast.success(`${file.name} uploaded successfully`)
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setUploading(null)
      setActiveTypeId(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  // Group by category
  const categories = Array.from(new Set(DOCUMENT_TYPES.map(dt => dt.category)))

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
             <ShieldCheck className="h-4 w-4" />
           </div>
           <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Secure Document Repository</h3>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-xl font-bold h-10 px-6 border-outline-variant/30 bg-surface-variant/20 gap-2"
          onClick={() => downloadAll(documents)}
          disabled={isZipping || documents.length === 0}
        >
          {isZipping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Export Mission Assets (.ZIP)
        </Button>
      </header>

      <div className="space-y-12">
        {categories.map(category => (
          <section key={category} className="space-y-6">
            <h4 className="text-[10px] font-extrabold text-outline uppercase tracking-[0.2em] flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary/40" /> {category}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DOCUMENT_TYPES.filter(dt => dt.category === category).map(docType => {
                const doc = getDocForType(docType.id)
                const isUploading = uploading === docType.id

                return (
                  <div key={docType.id} className={cn(
                    "flex flex-col p-6 rounded-3xl border transition-all duration-300",
                    doc ? "bg-white border-primary/20 shadow-sm" : "bg-surface-variant/10 border-outline-variant/10 border-dashed"
                  )}>
                    <div className="flex items-start justify-between mb-4">
                       <div className={cn(
                         "h-12 w-12 rounded-2xl flex items-center justify-center",
                         doc ? "bg-primary/10 text-primary" : "bg-surface-variant/30 text-outline-variant"
                       )}>
                         <FileText className="h-6 w-6" />
                       </div>
                       {doc ? (
                         <div className="flex items-center gap-2">
                           <CheckCircle2 className="h-4 w-4 text-green-600" />
                           <span className="text-[9px] font-black text-green-600 uppercase">ACTIVE</span>
                         </div>
                       ) : (
                         <div className="flex items-center gap-2">
                           <AlertCircle className="h-4 w-4 text-outline-variant" />
                           <span className="text-[9px] font-black text-outline-variant uppercase">MISSING</span>
                         </div>
                       )}
                    </div>

                    <div className="space-y-1 mb-6 flex-grow">
                      <h5 className="text-sm font-black text-on-surface font-headline leading-tight">{docType.label}</h5>
                      <p className="text-[10px] font-medium text-outline-variant italic">
                        {doc ? doc.file_name : "Security clearance required"}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between gap-3">
                       {doc ? (
                         <>
                           <Button variant="ghost" size="sm" className="font-bold text-[10px] uppercase h-9 bg-primary/5 text-primary rounded-xl flex-grow" asChild>
                              <a href={doc.view_url} target="_blank" rel="noreferrer">View Secure</a>
                           </Button>
                           <Button 
                             onClick={() => handleUploadClick(docType.id)}
                             disabled={isUploading}
                             variant="ghost" 
                             size="icon" 
                             className="h-9 w-9 rounded-xl border border-outline-variant/10"
                           >
                             <UploadIcon className="h-4 w-4 text-outline" />
                           </Button>
                         </>
                       ) : (
                         <Button 
                           onClick={() => handleUploadClick(docType.id)}
                           disabled={isUploading}
                           className="w-full bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 rounded-2xl h-12 font-black text-[10px] uppercase tracking-widest gap-2"
                         >
                           {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadIcon className="h-4 w-4" />}
                           {isUploading ? "Uploading Securely" : "Click to Upload"}
                         </Button>
                       )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
