'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function CRM() {
  const [customers, setCustomers] = useState([])
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', company: '', notes: '' })

  useEffect(() => {
    // In a real application, this would be an API call
    setCustomers([
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', company: 'Acme Corp', notes: 'Key decision maker' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', company: 'Tech Inc', notes: 'Interested in new products' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-555-5555', company: 'Big Corp', notes: 'Requires follow-up' },
    ])
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would be an API call
    setCustomers([...customers, { id: Date.now(), ...newCustomer }])
    setNewCustomer({ name: '', email: '', phone: '', company: '', notes: '' })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customer Relationship Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={newCustomer.name}
              onChange={handleInputChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={handleInputChange}
              required
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={newCustomer.phone}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="company"
              placeholder="Company"
              value={newCustomer.company}
              onChange={handleInputChange}
              required
            />
            <Textarea
              name="notes"
              placeholder="Notes"
              value={newCustomer.notes}
              onChange={handleInputChange}
            />
            <Button type="submit">Add Customer</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer: any) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.company}</TableCell>
                  <TableCell>{customer.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

