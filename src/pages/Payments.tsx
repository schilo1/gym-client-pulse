
import { useState } from "react";
import Navbar from "@/components/Navbar";
import PaymentForm from "@/components/PaymentForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { clients, payments, findClientById } from "@/utils/mockData";
import { Client, Payment } from "@/types";

const PaymentsPage = () => {
  const { toast } = useToast();
  const [clientsData, setClientsData] = useState<Client[]>(clients);
  const [paymentsData, setPaymentsData] = useState<Payment[]>(payments);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddPayment = (paymentData: {
    clientId: string;
    amount: number;
    note?: string;
  }) => {
    const client = clientsData.find((c) => c.id === paymentData.clientId);

    if (!client) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Client not found.",
      });
      return;
    }

    const newPayment: Payment = {
      id: `payment${paymentsData.length + 1}`,
      clientId: paymentData.clientId,
      amount: paymentData.amount,
      date: new Date(),
      note: paymentData.note,
    };

    setPaymentsData([...paymentsData, newPayment]);
    setShowAddPayment(false);

    toast({
      title: "Payment Recorded",
      description: `${paymentData.amount} FCFA payment for ${client.name} recorded.`,
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} FCFA`;
  };

  const filteredPayments = paymentsData.filter((payment) => {
    if (!searchTerm) return true;
    
    const client = findClientById(payment.clientId);
    const searchLower = searchTerm.toLowerCase();
    
    return (
      (client && client.name.toLowerCase().includes(searchLower)) ||
      (payment.note && payment.note.toLowerCase().includes(searchLower)) ||
      formatDate(payment.date).includes(searchTerm)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Payment History</h1>
          <Button 
            onClick={() => setShowAddPayment(!showAddPayment)}
            variant={showAddPayment ? "outline" : "default"}
            className={showAddPayment ? "" : "bg-primary-green hover:bg-green-600"}
          >
            {showAddPayment ? "Cancel" : "Record Payment"}
          </Button>
        </div>

        {showAddPayment && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Record New Payment</CardTitle>
                <CardDescription>Enter payment details below</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentForm 
                  clients={clientsData} 
                  onSave={handleAddPayment} 
                  isLoading={false}
                />
              </CardContent>
            </Card>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Payment Records</CardTitle>
            <CardDescription>
              View and search through all client payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                        No payments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => {
                      const client = findClientById(payment.clientId);
                      return (
                        <TableRow key={payment.id}>
                          <TableCell>{formatDate(payment.date)}</TableCell>
                          <TableCell>{client ? client.name : "Unknown Client"}</TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{payment.note || "-"}</TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentsPage;
