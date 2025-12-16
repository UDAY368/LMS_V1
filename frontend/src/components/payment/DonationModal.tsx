"use strict";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, CreditCard, Landmark, Heart } from "lucide-react";
import Image from "next/image";

export function DonationModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" size="lg" className="rounded-full shadow-lg gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0">
                    <Heart className="w-5 h-5 fill-current animate-pulse" />
                    <span>Donate Now</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-playfair text-center">Support Our Mission</DialogTitle>
                    <DialogDescription className="text-center">
                        Your contribution helps us keep these spiritual teachings free and accessible to everyone.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="upi" className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="upi">UPI / QR</TabsTrigger>
                        <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
                        <TabsTrigger value="bank">Bank</TabsTrigger>
                    </TabsList>

                    {/* UPI / QR Section */}
                    <TabsContent value="upi" className="space-y-4 py-4">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="bg-white p-4 rounded-xl shadow-inner border">
                                {/* Placeholder for QR Code */}
                                <div className="h-48 w-48 bg-gray-100 flex items-center justify-center rounded-lg">
                                    <QrCode className="w-16 h-16 text-muted-foreground" />
                                </div>
                            </div>
                            <p className="text-sm text-center text-muted-foreground">Scan with any UPI App (GPay, PhonePe, Paytm)</p>
                            <div className="bg-muted/50 px-4 py-2 rounded-full font-mono text-sm">
                                upi@spiritual-lms
                            </div>
                        </div>
                    </TabsContent>

                    {/* Razorpay Section */}
                    <TabsContent value="razorpay" className="space-y-4 py-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                {[500, 1000, 2000].map((amount) => (
                                    <Button key={amount} variant="outline" className="hover:border-primary hover:text-primary transition-colors">₹{amount}</Button>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Custom Amount</Label>
                                <Input id="amount" placeholder="Enter amount in ₹" type="number" />
                            </div>
                            <Button className="w-full h-12 text-lg bg-[#3395ff] hover:bg-[#287acc] text-white">
                                Pay with Razorpay
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Bank Transfer Section */}
                    <TabsContent value="bank" className="space-y-4 py-4">
                        <Card>
                            <CardContent className="space-y-4 pt-6">
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div className="text-muted-foreground">Bank Name</div>
                                    <div className="col-span-2 font-medium">HDFC Bank</div>

                                    <div className="text-muted-foreground">Account Name</div>
                                    <div className="col-span-2 font-medium">Spiritual Wisdom Foundation</div>

                                    <div className="text-muted-foreground">Account No.</div>
                                    <div className="col-span-2 font-mono bg-muted/50 p-1 rounded">5020003482910</div>

                                    <div className="text-muted-foreground">IFSC Code</div>
                                    <div className="col-span-2 font-mono bg-muted/50 p-1 rounded">HDFC0001234</div>

                                    <div className="text-muted-foreground">Branch</div>
                                    <div className="col-span-2 font-medium">Indiranagar, Bangalore</div>
                                </div>
                            </CardContent>
                        </Card>
                        <p className="text-xs text-center text-muted-foreground mt-2">
                            Please share the transaction screenshot to support@spiritual-lms.com for receipt.
                        </p>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
