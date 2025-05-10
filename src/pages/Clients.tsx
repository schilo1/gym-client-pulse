
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ClientList from "@/components/ClientList";
import ClientForm from "@/components/ClientForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { clients } from "@/utils/mockData";
import { Client } from "@/types";

const Clients = () => {
  const { toast } = useToast();
  const [clientsData, setClientsData] = useState<Client[]>(clients);
  const [showAddClient, setShowAddClient] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Client Management</h1>
          <Button 
            onClick={() => setShowAddClient(!showAddClient)}
            variant={showAddClient ? "outline" : "default"}
            className={showAddClient ? "" : "bg-primary-blue hover:bg-blue-600"}
          >
            {showAddClient ? "Cancel" : "Register New Client"}
          </Button>
        </div>

        {showAddClient && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>New Client Registration</CardTitle>
                <CardDescription>Enter the client details below</CardDescription>
              </CardHeader>
              <CardContent>
                <ClientForm onSave={handleAddClient} />
              </CardContent>
            </Card>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>All Clients</CardTitle>
            <CardDescription>
              Manage and search through your client base
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClientList clients={clientsData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Clients;
