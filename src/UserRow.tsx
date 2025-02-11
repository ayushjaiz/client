import { useState } from "react"
import { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UserRowProps {
    user: User
    onUpdate: (updatedUser: User) => Promise<void>
}

export default function UserRow({ user, onUpdate }: UserRowProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [editedUser, setEditedUser] = useState(user)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditedUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await onUpdate(editedUser)
        setIsOpen(false)
    }

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">{user.id}</td>
            <td className="py-3 px-6 text-left">{user.name}</td>
            <td className="py-3 px-6 text-left">{user.email}</td>
            <td className="py-3 px-6 text-center">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={editedUser.name} onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={editedUser.email} onChange={handleInputChange} />
                            </div>
                            <Button type="submit">Save Changes</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </td>
        </tr>
    )
}

