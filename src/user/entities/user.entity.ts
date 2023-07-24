export class User {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  password: string;
  role: 'admin' | 'user';
  status?: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
  updatedBy?: string;
}
