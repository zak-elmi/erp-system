'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SCM() {
  const [orders, setOrders] = useState([])
  const [newOrder, setNewOrder] = useState({ date: '', supplier: '', item: '', quantity: '', status: '' })

  useEffect(() => {
    // In a real application, this would be an API call
    setOrders([
      { id: 1, date: '2023-06-01', supplier: 'Acme Supplies', item: 'Widget A', quantity: 1000, status: 'Pending' },
      { id: 2, date: '2023-06-02', supplier: 'Global Parts', item: 'Gadget B', quantity: 500, status: 'Shipped' },
      { id: 3, date: '2023-06-03', supplier: 'Tech Solutions', item: 'Doohickey C', quantity: 750, status: 'Delivered' },
    ])
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setNewOrder({ ...newOrder, status: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would be an API call
    setOrders([...orders, { id: Date.now(), ...newOrder, quantity: parseInt(newOrder.quantity) }])
    setNewOrder({ date: '', supplier: '', item: '', quantity: '', status: '' })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Supply Chain Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create Purchase Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="date"
              name="date"
              value={newOrder.date}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="supplier"
              placeholder="Supplier"
              value={newOrder.supplier}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="item"
              placeholder="Item"
              value={newOrder.item}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newOrder.quantity}
              onChange={handleInputChange}
              required
            />
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Create Order</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.item}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

