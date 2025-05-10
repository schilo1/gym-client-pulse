
import { Client, Payment, User } from "../types";

// Mock users for authentication
export const users: User[] = [
  {
    id: "user1",
    email: "admin@e-gym.com",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "user2",
    email: "staff@e-gym.com",
    name: "Staff User",
    role: "staff",
  },
];

// Mock clients
export const clients: Client[] = [
  {
    id: "client1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    registrationDate: new Date("2023-01-15"),
  },
  {
    id: "client2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+2345678901",
    registrationDate: new Date("2023-02-20"),
  },
  {
    id: "client3",
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "+3456789012",
    registrationDate: new Date("2023-03-05"),
  },
  {
    id: "client4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+4567890123",
    registrationDate: new Date("2023-04-10"),
  },
  {
    id: "client5",
    name: "Robert Brown",
    email: "robert@example.com",
    phone: "+5678901234",
    registrationDate: new Date("2023-05-15"),
  },
];

// Mock payments - each 500 FCFA
export const payments: Payment[] = [
  {
    id: "payment1",
    clientId: "client1",
    amount: 500,
    date: new Date("2023-06-01"),
    note: "Monthly fee",
  },
  {
    id: "payment2",
    clientId: "client1",
    amount: 500,
    date: new Date("2023-07-01"),
    note: "Monthly fee",
  },
  {
    id: "payment3",
    clientId: "client2",
    amount: 500,
    date: new Date("2023-06-05"),
    note: "Monthly fee",
  },
  {
    id: "payment4",
    clientId: "client3",
    amount: 500,
    date: new Date("2023-06-10"),
    note: "Monthly fee",
  },
  {
    id: "payment5",
    clientId: "client4",
    amount: 500,
    date: new Date("2023-06-15"),
    note: "Monthly fee",
  },
  {
    id: "payment6",
    clientId: "client5",
    amount: 500,
    date: new Date("2023-06-20"),
    note: "Monthly fee",
  },
];

// Helper to find client by ID
export const findClientById = (id: string): Client | undefined => {
  return clients.find((client) => client.id === id);
};

// Helper to get payments by client ID
export const getPaymentsByClientId = (clientId: string): Payment[] => {
  return payments.filter((payment) => payment.clientId === clientId);
};
