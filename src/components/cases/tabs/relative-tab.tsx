"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RelativeInfoTabProps {
  data: any
  onUpdate: (update: any) => Promise<any>
}

export function RelativeInfoTab({ data, onUpdate }: RelativeInfoTabProps) {
  const handleUpdate = async (field: string, value: any) => {
    if (data[field] === value) return
    await onUpdate({ [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relative / Emergency Contact</CardTitle>
        <CardDescription>Primary contact person for the patient during transfer.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Relative Name</Label>
            <Input 
              defaultValue={data.relative_name}
              onBlur={(e) => handleUpdate("relative_name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Relation to Patient</Label>
            <Input 
              defaultValue={data.relative_relation}
              onBlur={(e) => handleUpdate("relative_relation", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2 max-w-sm">
          <Label>Contact Number</Label>
          <Input 
            defaultValue={data.relative_contact_number}
            onBlur={(e) => handleUpdate("relative_contact_number", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
