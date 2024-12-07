'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

// Mock data for employee performance
const performanceData = [
  { name: 'John Doe', performance: 85 },
  { name: 'Jane Smith', performance: 92 },
  { name: 'Bob Johnson', performance: 78 },
  { name: 'Alice Brown', performance: 88 },
  { name: 'Charlie Davis', performance: 95 },
]

// Mock data for department growth
const departmentGrowthData = [
  { name: 'Engineering', growth: 15 },
  { name: 'Marketing', growth: 8 },
  { name: 'Sales', growth: 20 },
  { name: 'HR', growth: 5 },
  { name: 'Finance', growth: 10 },
]

export default function HR() {
  const [employees, setEmployees] = useState([])
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    status: '',
    joinDate: ''
  })

  useEffect(() => {
    // In a real application, this would be an API call
    setEmployees([
      { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering', status: 'Active', joinDate: '2023-01-15' },
      { id: 2, name: 'Jane Smith', position: 'Marketing Manager', department: 'Marketing', status: 'Active', joinDate: '2023-02-01' },
      { id: 3, name: 'Bob Johnson', position: 'Sales Representative', department: 'Sales', status: 'On Leave', joinDate: '2023-03-10' },
    ])
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
  }

  const handleStatusChange = (value: string) => {
    setNewEmployee({ ...newEmployee, status: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmployees([...employees, { id: Date.now(), ...newEmployee }])
    setNewEmployee({ name: '', position: '', department: '', status: '', joinDate: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Human Resources</h1>
        <Button variant="outline">Download Report</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Employee Name"
                value={newEmployee.name}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="position"
                placeholder="Position"
                value={newEmployee.position}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="department"
                placeholder="Department"
                value={newEmployee.department}
                onChange={handleInputChange}
                required
              />
              <Select onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                name="joinDate"
                placeholder="Join Date"
                value={newEmployee.joinDate}
                onChange={handleInputChange}
                required
              />
              <Button type="submit" className="w-full">Add Employee</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-accent rounded-lg">
                <div>
                  <p className="text-sm font-medium">Engineering</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-primary" />
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent rounded-lg">
                <div>
                  <p className="text-sm font-medium">Marketing</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-primary" />
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent rounded-lg">
                <div>
                  <p className="text-sm font-medium">Sales</p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card><CardHeader>
          <CardTitle>Employee Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee: any) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === 'Active' ? 'bg-green-100 text-green-800' :
                      employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell>{employee.joinDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Employee Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="performance" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentGrowthData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="growth" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

