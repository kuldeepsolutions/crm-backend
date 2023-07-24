export interface CompanyInterface {
  name: string;
  type: string;
  industry: string;
  billingAddress?: string;
  shippingAddress?: string;
  panNumber?: string;
  tinNumber?: string;
  contacts?: string[];
  website?: string;
  description?: string;
  tags?: string[];
  relationShips?: string[];
  revenue?: string;
  employees?: string[];
  documents?: string[];
  history?: string;
  opportunities?: string[];
  activities?: string[];
  isDeleted?: boolean;
  deletedAt?: Date;
}
