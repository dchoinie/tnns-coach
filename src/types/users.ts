export interface User {
  id: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  title: string;
  profileCompleted: boolean;
  organizationCompleted: boolean;
  clerkId: string;
}
