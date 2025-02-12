"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MembersSection() {
  const [members, setMembers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Member" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Admin" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Member" },
  ])

  const [newMember, setNewMember] = useState({ name: "", email: "", role: "Member" })

  const addMember = () => {
    if (newMember.name && newMember.email) {
      setMembers([...members, { ...newMember, id: members.length + 1 }])
      setNewMember({ name: "", email: "", role: "Member" })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            />
            <Button onClick={addMember}>Add Member</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <Button variant="ghost">Edit</Button>
                    <Button variant="ghost" className="text-red-500">
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

