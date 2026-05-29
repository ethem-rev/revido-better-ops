export type Category = "improve" | "add" | "remove";
export type Status = "pending" | "in_progress" | "done";

export interface Procedure {
  id: string;
  title: string;
  description: string | null;
  category: Category;
  status: Status;
  month: string;
  carried_from: string | null;
  created_at: string;
}
