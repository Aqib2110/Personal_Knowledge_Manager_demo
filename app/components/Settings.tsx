"use client";
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
   import { Switch } from "@/components/ui/switch";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
     import { Separator } from "@/components/ui/separator";
const Settings = () => {
    return (
        <div className='min-h-screen bg-gray-50 px-6 pb-6 pt-[60px]'>
            <div className="mx-auto max-w-5xl space-y-8"> 

                <div> <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
                    <p className="mt-1 text-gray-500">Manage your account, preferences, and workspace</p> </div>

                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6 md:flex-row md:items-center">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src="/avatar.png" />
                                <AvatarFallback>MA</AvatarFallback>
                            </Avatar>
                            <Button variant="outline">Change Avatar</Button>
                        </div>
                        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                            <Input placeholder="Full Name" />
                            <Input placeholder="Email Address" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Workspace</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input placeholder="Workspace Name" />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Allow members to upload documents</p>
                                <p className="text-sm text-gray-500">Admins can restrict uploads</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>Email notifications</span>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <span>AI summary ready alerts</span>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Weekly usage reports</span>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline">Change Password</Button>
                        <Button variant="outline">Enable Two-Factor Authentication</Button>
                    </CardContent>
                </Card>

                <Separator />

                <Card className="rounded-2xl border-red-200">
                    <CardHeader>
                        <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Delete your account and all associated data</p>
                        <Button variant="destructive">Delete Account</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Settings

