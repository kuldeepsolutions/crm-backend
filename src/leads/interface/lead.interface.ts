export interface LeadInterface {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone?: string;
  readonly company?: string;
  readonly source?: string;
  readonly status?: string;
  readonly isDeleted?: boolean;
  readonly deleteAt?: Date;
}
