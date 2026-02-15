import { Customer } from "./Customer";
export interface Job {
  id: number;
  title: string;
  description: string;
  scheduledDate: string;
  status: string;
  customer: Customer;
}
