
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: Date;
}

export interface Payment {
  id: string;
  clientId: string;
  amount: number;
  date: Date;
  note?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff';
}
