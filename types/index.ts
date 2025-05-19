export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contactNumber: string;
  email: string;
  medicalHistory: string[];
  lastVisit: string;
  upcomingAppointment?: string;
}

export interface Bill {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: BillItem[];
}

export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Experiment {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  patientId: string;
  patientName: string;
  type: string;
  startDate: string;
  endDate?: string;
  results?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  location: string;
  expiryDate?: string;
}

export interface Activity {
  id: string;
  type: 'patient' | 'experiment' | 'billing' | 'inventory';
  description: string;
  timestamp: string;
  relatedId: string;
  status?: string;
}

export interface DashboardMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  icon: string;
  color: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity?: number) => string;
    strokeWidth?: number;
  }[];
}

export interface AppSettings {
  language: 'en' | 'ar';
  theme: 'light' | 'dark';
  units: 'metric' | 'imperial';
  notifications: boolean;
}