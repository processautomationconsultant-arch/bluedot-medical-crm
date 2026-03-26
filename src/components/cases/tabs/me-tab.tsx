"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface MEDetailsTabProps {
  data: any
  onUpdate: (update: any) => Promise<any>
}

export function MEDetailsTab({ data, onUpdate }: MEDetailsTabProps) {
  const handleUpdate = async (field: string, value: any) => {
    if (data[field] === value) return
    await onUpdate({ [field]: value })
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Medical Escort (ME) Logistics</CardTitle>
          <CardDescription>Hotel and return travel arrangements for the medical crew.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Hotel Booking Status</Label>
              <Select defaultValue={data.me_hotel_booking_status} onValueChange={(v) => handleUpdate("me_hotel_booking_status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="not_required">Not Required</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="checked_in">Checked In</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Hotel Name</Label>
              <Input defaultValue={data.me_hotel_name} onBlur={(e) => handleUpdate("me_hotel_name", e.target.value)} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Return Flight Status</Label>
              <Select defaultValue={data.me_return_flight_status} onValueChange={(v) => handleUpdate("me_return_flight_status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="not_required">Not Required</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>ETA to Base</Label>
              <Input 
                type="datetime-local"
                defaultValue={data.me_eta_to_base ? new Date(data.me_eta_to_base).toISOString().slice(0, 16) : ""}
                onBlur={(e) => handleUpdate("me_eta_to_base", e.target.value ? new Date(e.target.value).toISOString() : null)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
                id="transfer-completion-mail" 
                checked={data.transfer_completion_mail} 
                onCheckedChange={(v) => handleUpdate("transfer_completion_mail", v)}
            />
            <Label htmlFor="transfer-completion-mail">Transfer Completion Mail Sent</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
