
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Client } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

interface PaymentFormProps {
  clients: Client[];
  onSave: (payment: {
    clientId: string;
    amount: number;
    nextPaymentDate?: Date;
    note?: string;
  }) => void;
  isLoading?: boolean;
}

const PaymentForm = ({ clients, onSave, isLoading = false }: PaymentFormProps) => {
  const { toast } = useToast();
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState(500); // Default to 500 FCFA
  const [note, setNote] = useState("");
  const [isMonthlyFee, setIsMonthlyFee] = useState(false);

  const calculateNextPaymentDate = (currentDate: Date): Date => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a client",
      });
      return;
    }

    const currentDate = new Date();
    const paymentData: {
      clientId: string;
      amount: number;
      nextPaymentDate?: Date;
      note?: string;
    } = {
      clientId,
      amount,
      note: note.trim() ? note : undefined,
    };

    // If it's a monthly fee payment, calculate the next payment date
    if (isMonthlyFee) {
      paymentData.nextPaymentDate = calculateNextPaymentDate(currentDate);
    }

    onSave(paymentData);

    // Reset form
    setClientId("");
    setAmount(500);
    setNote("");
    setIsMonthlyFee(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Payment</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client">Select Client</Label>
            <Select
              value={clientId}
              onValueChange={setClientId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (FCFA)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={1}
              required
            />
          </div>
          <div className="flex items-center space-x-2 my-4">
            <Checkbox id="monthlyFee" checked={isMonthlyFee} onCheckedChange={(checked) => setIsMonthlyFee(checked === true)} />
            <Label htmlFor="monthlyFee" className="text-sm cursor-pointer">This is a monthly fee payment</Label>
          </div>
          {isMonthlyFee && (
            <div className="p-3 bg-green-50 rounded-md text-sm">
              <p>Next payment will be due in one month from today.</p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Textarea
              id="note"
              placeholder="Monthly fee, Personal training, etc."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-primary-green hover:bg-green-600"
          >
            {isLoading ? "Processing..." : "Record Payment"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PaymentForm;
