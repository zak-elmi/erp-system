'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 4500 },
  { name: 'Fri', sales: 6000 },
  { name: 'Sat', sales: 5500 },
  { name: 'Sun', sales: 4200 },
]

export default function Sales() {
  const [salesOrders, setSalesOrders] = useState([])
  const [newOrder, setNewOrder] = useState({
    date: '',
    customer: '',
    product: '',
    quantity: '',
    status: '',
    total: ''
  })

  useEffect(() => {
    // In a real application, this would be an API call
    setSalesOrders([
      { id: 1, date: '2023-06-01', customer: 'Acme Corp', product: 'Widget A', quantity: 50, status: 'Completed', total: 1999.99 },
      { id: 2, date: '2023-06-02', customer: 'GlobalTech', product: 'Gadget B', quantity: 25, status: 'Pending', total: 2499.99 },
      { id: 3, date: '2023-06-03', customer: 'MegaCorp', product: 'Tool C', quantity: 100, status: 'Processing', total: 1749.99 },
    ])
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value })
  }

  const handleStatusChange = (value: string) => {
    setNewOrder({ ...newOrder, status: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSalesOrders([...salesOrders, {
      id: Date.now(),
      ...newOrder,
      quantity: parseInt(newOrder.quantity),
      total: parseFloat(newOrder.total)
    }])
    setNewOrder({ date: '', customer: '', product: '', quantity: '', status: '', total: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sales Management</h1>
        <div className="space-x-4">
          <Button variant="outline">Export</Button>
          <Button>New Sale</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Today's Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$12,426.89</div>
            <p className="text-xs text-muted-foreground">+15% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$85,124.45</div>
            <p className="text-xs text-muted-foreground">+20% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">5 require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$892.12</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Sales Order</CardTitle>
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
                name="customer"
                placeholder="Customer Name"
                value={newOrder.customer}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="product"
                placeholder="Product"
                value={newOrder.product}
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
              <Select onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                name="total"
                placeholder="Total Amount"
                value={newOrder.total}
                onChange={handleInputChange}
                required
                step="0.01"
              />
              <Button type="submit" className="w-full">Create Order</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesOrders.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

