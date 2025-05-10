
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Client, Payment } from "@/types";
import { Users, CreditCard, CalendarCheck, TrendingUp } from "lucide-react";

interface StatsProps {
  clients: Client[];
  payments: Payment[];
}

const Stats = ({ clients, payments }: StatsProps) => {
  // Total number of clients
  const totalClients = clients.length;

  // Total payments amount
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

  // Payments this month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const paymentsThisMonth = payments.filter(payment => {
    const paymentDate = new Date(payment.date);
    return paymentDate.getMonth() === currentMonth && 
           paymentDate.getFullYear() === currentYear;
  });
  
  const monthlyTotal = paymentsThisMonth.reduce((sum, payment) => sum + payment.amount, 0);

  // New clients this month
  const newClientsThisMonth = clients.filter(client => {
    const registrationDate = new Date(client.registrationDate);
    return registrationDate.getMonth() === currentMonth && 
           registrationDate.getFullYear() === currentYear;
  }).length;

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} FCFA`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-primary-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClients}</div>
          <p className="text-xs text-gray-500 mt-1">
            {newClientsThisMonth} new this month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-primary-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
          <p className="text-xs text-gray-500 mt-1">
            Lifetime earnings
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          <CalendarCheck className="h-4 w-4 text-secondary-indigo" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(monthlyTotal)}</div>
          <p className="text-xs text-gray-500 mt-1">
            {paymentsThisMonth.length} payments this month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Payment</CardTitle>
          <TrendingUp className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(payments.length ? Math.round(totalAmount / payments.length) : 0)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Per transaction
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
