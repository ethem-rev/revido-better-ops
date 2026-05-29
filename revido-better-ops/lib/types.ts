export type Status = "New" | "In Progress" | "Improved" | "Failed";

export interface Initiative {
  id: string;
  title: string;
  description: string | null;
  owner: string;
  status: Status;
  month_assigned: string;
  created_at: string;
}
