export interface OpportunityInterface   {
  name: string;
  tags?: string;
  type?: string;
  notes?: string;
  
  stage?: string;
  source?: string;
  amount?: string;
  contact?: string;
  history?: string;
  deletedAt?: Date;
  closeDate?: Date;
  createdAt?: Date,

  priority?: string;
  createdBy?: string;
  description: string;
  salesStage?: string;
  isDeleted?: boolean;
  probability?: number;
  forecasting?: string;

  tasks?: string[];
  contacts?: string[];
  products?: string[];
  reminders?: string[];
  collaborators?: string[];
  notifications?: string[];
  conversations?: string[];
}
