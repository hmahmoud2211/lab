import { Patient, Bill, Experiment, InventoryItem, Activity, DashboardMetric, ChartData } from '../types';

// Helper to generate dates in the past
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

// Helper to generate dates in the future
const daysFromNow = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

// Patients mock data
export const patients: Patient[] = [
  {
    id: 'p1',
    name: 'John Smith',
    age: 45,
    gender: 'male',
    contactNumber: '+1-555-123-4567',
    email: 'john.smith@example.com',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    lastVisit: daysAgo(5),
    upcomingAppointment: daysFromNow(7),
  },
  {
    id: 'p2',
    name: 'Jane Doe',
    age: 32,
    gender: 'female',
    contactNumber: '+1-555-987-6543',
    email: 'jane.doe@example.com',
    medicalHistory: ['Asthma'],
    lastVisit: daysAgo(12),
  },
  {
    id: 'p3',
    name: 'Robert Johnson',
    age: 58,
    gender: 'male',
    contactNumber: '+1-555-456-7890',
    email: 'robert.johnson@example.com',
    medicalHistory: ['Coronary Heart Disease', 'Hyperlipidemia'],
    lastVisit: daysAgo(3),
    upcomingAppointment: daysFromNow(14),
  },
  {
    id: 'p4',
    name: 'Emily Williams',
    age: 28,
    gender: 'female',
    contactNumber: '+1-555-789-0123',
    email: 'emily.williams@example.com',
    medicalHistory: ['Migraine'],
    lastVisit: daysAgo(8),
    upcomingAppointment: daysFromNow(3),
  },
  {
    id: 'p5',
    name: 'Michael Brown',
    age: 41,
    gender: 'male',
    contactNumber: '+1-555-321-0987',
    email: 'michael.brown@example.com',
    medicalHistory: ['GERD', 'Anxiety'],
    lastVisit: daysAgo(15),
  },
];

// Bills mock data
export const bills: Bill[] = [
  {
    id: 'b1',
    patientId: 'p1',
    patientName: 'John Smith',
    amount: 245.50,
    date: daysAgo(5),
    dueDate: daysFromNow(10),
    status: 'pending',
    items: [
      { id: 'bi1', description: 'Blood Test - Complete Blood Count', quantity: 1, unitPrice: 120.0, total: 120.0 },
      { id: 'bi2', description: 'Consultation Fee', quantity: 1, unitPrice: 125.50, total: 125.50 },
    ],
  },
  {
    id: 'b2',
    patientId: 'p2',
    patientName: 'Jane Doe',
    amount: 175.0,
    date: daysAgo(12),
    dueDate: daysAgo(2),
    status: 'paid',
    items: [
      { id: 'bi3', description: 'Urinalysis', quantity: 1, unitPrice: 75.0, total: 75.0 },
      { id: 'bi4', description: 'Spirometry', quantity: 1, unitPrice: 100.0, total: 100.0 },
    ],
  },
  {
    id: 'b3',
    patientId: 'p3',
    patientName: 'Robert Johnson',
    amount: 350.75,
    date: daysAgo(3),
    dueDate: daysFromNow(12),
    status: 'pending',
    items: [
      { id: 'bi5', description: 'Lipid Panel', quantity: 1, unitPrice: 95.75, total: 95.75 },
      { id: 'bi6', description: 'ECG', quantity: 1, unitPrice: 155.0, total: 155.0 },
      { id: 'bi7', description: 'Consultation Fee', quantity: 1, unitPrice: 100.0, total: 100.0 },
    ],
  },
  {
    id: 'b4',
    patientId: 'p4',
    patientName: 'Emily Williams',
    amount: 145.0,
    date: daysAgo(8),
    dueDate: daysAgo(1),
    status: 'overdue',
    items: [
      { id: 'bi8', description: 'Blood Test - Iron Panel', quantity: 1, unitPrice: 95.0, total: 95.0 },
      { id: 'bi9', description: 'Consultation Fee', quantity: 1, unitPrice: 50.0, total: 50.0 },
    ],
  },
  {
    id: 'b5',
    patientId: 'p5',
    patientName: 'Michael Brown',
    amount: 210.25,
    date: daysAgo(15),
    dueDate: daysAgo(5),
    status: 'paid',
    items: [
      { id: 'bi10', description: 'Gastroscopy', quantity: 1, unitPrice: 180.25, total: 180.25 },
      { id: 'bi11', description: 'Consultation Fee', quantity: 1, unitPrice: 30.0, total: 30.0 },
    ],
  },
];

// Experiments mock data
export const experiments: Experiment[] = [
  {
    id: 'e1',
    name: 'Complete Blood Count Analysis',
    status: 'completed',
    patientId: 'p1',
    patientName: 'John Smith',
    type: 'Hematology',
    startDate: daysAgo(5),
    endDate: daysAgo(4),
    results: 'Normal levels for all parameters. No abnormalities detected.',
  },
  {
    id: 'e2',
    name: 'Respiratory Function Test',
    status: 'completed',
    patientId: 'p2',
    patientName: 'Jane Doe',
    type: 'Pulmonology',
    startDate: daysAgo(12),
    endDate: daysAgo(11),
    results: 'Mild airway obstruction observed. Consistent with controlled asthma.',
  },
  {
    id: 'e3',
    name: 'Cardiac Enzyme Panel',
    status: 'in-progress',
    patientId: 'p3',
    patientName: 'Robert Johnson',
    type: 'Cardiology',
    startDate: daysAgo(2),
  },
  {
    id: 'e4',
    name: 'Iron Deficiency Analysis',
    status: 'pending',
    patientId: 'p4',
    patientName: 'Emily Williams',
    type: 'Hematology',
    startDate: daysFromNow(1),
  },
  {
    id: 'e5',
    name: 'H. pylori Test',
    status: 'completed',
    patientId: 'p5',
    patientName: 'Michael Brown',
    type: 'Gastroenterology',
    startDate: daysAgo(15),
    endDate: daysAgo(14),
    results: 'Positive for H. pylori. Treatment recommended.',
  },
];

// Inventory items mock data
export const inventoryItems: InventoryItem[] = [
  {
    id: 'i1',
    name: 'Test Tubes - 10ml',
    category: 'Lab Equipment',
    quantity: 500,
    unit: 'pcs',
    reorderLevel: 100,
    location: 'Storage Room A',
    expiryDate: daysFromNow(365),
  },
  {
    id: 'i2',
    name: 'Blood Glucose Test Strips',
    category: 'Diagnostic',
    quantity: 250,
    unit: 'pcs',
    reorderLevel: 50,
    location: 'Medical Supply Cabinet',
    expiryDate: daysFromNow(180),
  },
  {
    id: 'i3',
    name: 'Disposable Gloves - Size M',
    category: 'Protective Equipment',
    quantity: 2000,
    unit: 'pairs',
    reorderLevel: 500,
    location: 'Exam Room Supply',
  },
  {
    id: 'i4',
    name: 'Microscope Slides',
    category: 'Lab Equipment',
    quantity: 300,
    unit: 'pcs',
    reorderLevel: 75,
    location: 'Lab Cabinet B',
  },
  {
    id: 'i5',
    name: 'Disinfectant Solution',
    category: 'Cleaning Supplies',
    quantity: 25,
    unit: 'liters',
    reorderLevel: 10,
    location: 'Cleaning Storage',
    expiryDate: daysFromNow(720),
  },
];

// Recent activities mock data
export const activities: Activity[] = [
  {
    id: 'a1',
    type: 'patient',
    description: 'New patient registered',
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(), // 25 minutes ago
    relatedId: 'p1',
  },
  {
    id: 'a2',
    type: 'experiment',
    description: 'Experiment completed',
    timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
    relatedId: 'e1',
    status: 'completed',
  },
  {
    id: 'a3',
    type: 'billing',
    description: 'Payment received',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), // 5 hours ago
    relatedId: 'b2',
  },
  {
    id: 'a4',
    type: 'inventory',
    description: 'Low stock alert: Disposable Gloves',
    timestamp: new Date(Date.now() - 8 * 3600000).toISOString(), // 8 hours ago
    relatedId: 'i3',
  },
  {
    id: 'a5',
    type: 'experiment',
    description: 'New experiment started',
    timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
    relatedId: 'e3',
    status: 'in-progress',
  },
];

// Dashboard metrics mock data
export const dashboardMetrics: DashboardMetric[] = [
  {
    id: 'm1',
    title: 'Total Patients',
    value: 1248,
    change: 5.2,
    icon: 'users',
    color: '#0366D6',
  },
  {
    id: 'm2',
    title: 'Tests Performed',
    value: 826,
    change: 12.4,
    icon: 'flask-round',
    color: '#00BFA5',
  },
  {
    id: 'm3',
    title: 'Reports Generated',
    value: 492,
    change: -3.1,
    icon: 'clipboard-check',
    color: '#6200EA',
  },
  {
    id: 'm4',
    title: 'Pending Payments',
    value: 68,
    change: 8.5,
    icon: 'credit-card',
    color: '#FF6D00',
  },
];

// Chart data for last 7 days tests
export const testChartData: ChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [18, 25, 22, 38, 41, 29, 35],
      color: (opacity = 1) => `rgba(3, 102, 214, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};