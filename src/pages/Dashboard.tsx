
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";
import ClientForm from "@/components/ClientForm";
import PaymentForm from "@/components/PaymentForm";
import ClientList from "@/components/ClientList";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { clients, payments } from "@/utils/mockData";
import { Client, Payment } from "@/types";

const Dashboard = () => {
  const { toast } = useToast();
  const [clientsData, setClientsData] = useState<Client[]>(clients);
  const [paymentsData, setPaymentsData] = useState<Payment[]>(payments);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  const handleAddClient = (clientData: Omit<Client, "id" | "registrationDate">) => {
    const newClient: Client = {
      ...clientData,
      id: `client${clientsData.length + 1}`,
      registrationDate: new Date(),
    };

    setClientsData([...clientsData, newClient]);
    setShowAddClient(false);
    
    toast({
      title: "Client Registered",
      description: `${newClient.name} has been successfully registered.`,
    });
  };

  const handleAddPayment = (paymentData: { clientId: string; amount: number; note?: string }) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <Stats clients={clientsData} payments={paymentsData} />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Clients</CardTitle>
                  <CardDescription>Your most recently registered clients</CardDescription>
                </div>
                <Button 
                  onClick={() => setShowAddClient(!showAddClient)}
                  variant={showAddClient ? "outline" : "default"}
                  className={showAddClient ? "" : "bg-primary-blue hover:bg-blue-600"}
                >
                  {showAddClient ? "Cancel" : "Add Client"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showAddClient ? (
                <ClientForm onSave={handleAddClient} />
              ) : (
                <ClientList clients={clientsData.slice(-6).reverse()} />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Quick Payment</CardTitle>
                  <CardDescription>Record a new payment</CardDescription>
                </div>
                {!showAddPayment && (
                  <Button 
                    onClick={() => setShowAddPayment(true)}
                    className="bg-primary-green hover:bg-green-600"
                  >
                    New Payment
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {showAddPayment ? (
                <PaymentForm 
                  clients={clientsData} 
                  onSave={handleAddPayment} 
                  isLoading={false}
                />
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Click "New Payment" to record a client payment.
                  </p>
                  <div className="text-center py-10">
                    <p className="text-gray-400">💰</p>
                    <p className="text-gray-500 mt-2">Manage payments quickly</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
