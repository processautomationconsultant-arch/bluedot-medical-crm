"use client"

import { Metadata } from "next"
import { Download, FileText, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
         <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">Generate and export tabular data and summaries.</p>
         </div>
         <Button>
           <Download className="mr-2 h-4 w-4" /> Export Report
         </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
               <label className="text-sm font-medium">Date Range</label>
               <Select defaultValue="this_month">
                 <SelectTrigger><SelectValue /></SelectTrigger>
                 <SelectContent>
                   <SelectItem value="this_week">This Week</SelectItem>
                   <SelectItem value="this_month">This Month</SelectItem>
                   <SelectItem value="this_quarter">This Quarter</SelectItem>
                   <SelectItem value="custom">Custom Range</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             
             <div className="space-y-2">
               <label className="text-sm font-medium">Zone</label>
               <Select defaultValue="all">
                 <SelectTrigger><SelectValue /></SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">All Zones</SelectItem>
                   <SelectItem value="zone_1">Zone 1</SelectItem>
                   <SelectItem value="zone_2">Zone 2</SelectItem>
                   <SelectItem value="zone_3">Zone 3</SelectItem>
                 </SelectContent>
               </Select>
             </div>

             <div className="space-y-2">
               <label className="text-sm font-medium">Transfer Type</label>
               <Select defaultValue="all">
                 <SelectTrigger><SelectValue /></SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">All Types</SelectItem>
                   <SelectItem value="aa">Air Ambulance (AA)</SelectItem>
                   <SelectItem value="me">Medical Escort (ME)</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             
             <Button className="w-full mt-4" variant="outline">
               <Filter className="mr-2 h-4 w-4" /> Apply Filters
             </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>Generated Report Preview</CardTitle>
            <CardDescription>Showing top 5 rows based on active filters.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border p-4 text-sm bg-muted/20">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2">Case ID</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Zone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-2">BDC-2026-001</td>
                    <td className="py-2">2026-03-27</td>
                    <td className="py-2">Active</td>
                    <td className="py-2">Zone 1</td>
                  </tr>
                  <tr className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-2">BDC-2026-002</td>
                    <td className="py-2">2026-03-30</td>
                    <td className="py-2">On Hold</td>
                    <td className="py-2">Zone 2</td>
                  </tr>
                  <tr className="hover:bg-muted/50 flex py-4 items-center justify-center w-full">
                    <td colSpan={4} className="text-muted-foreground flex items-center justify-center">
                      <FileText className="mr-2 h-4 w-4" />
                      More rows available in export...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
