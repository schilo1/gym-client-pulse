
import { Client } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ClientCardProps {
  client: Client;
  showActions?: boolean;
}

const ClientCard = ({ client, showActions = true }: ClientCardProps) => {
  const navigate = useNavigate();
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg">{client.name}</h3>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="mr-2 h-4 w-4" />
            <span>{client.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="mr-2 h-4 w-4" />
            <span>{client.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Registered: {formatDate(client.registrationDate)}</span>
          </div>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="pt-0 flex justify-between">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/clients/${client.id}`)}
          >
            View Details
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ClientCard;
