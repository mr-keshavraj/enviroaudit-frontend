export interface Organization {
  id: string;
  name: string;
  industry: string;
  country: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedOrganizations {
  count: number;
  next: string | null;
  previous: string | null;
  results: Organization[];
}