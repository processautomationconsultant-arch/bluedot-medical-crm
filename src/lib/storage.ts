import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!

// Note: For server-side storage operations (like creating buckets or managing policies), 
// we typically use the service role key. For client-side uploads, we use the publishable key with RLS.
export const supabase = createClient(supabaseUrl, supabaseKey)

const BUCKET_NAME = "case-documents"

/**
 * Uploads a file to Supabase Storage
 */
export async function uploadDocument(
  caseId: string,
  file: File | Blob,
  fileName: string,
  documentType: string
) {
  const filePath = `${caseId}/${documentType}/${Date.now()}_${fileName}`
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) throw error
  return data.path
}

/**
 * Generates a temporary signed URL for viewing a document
 */
export async function getDocumentUrl(path: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(path, 3600) // 1 hour expiry

  if (error) throw error
  return data.signedUrl
}

/**
 * Deletes a document from storage
 */
export async function deleteDocument(path: string) {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path])

  if (error) throw error
}
