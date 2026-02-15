import { Customer } from "../types/Customer";
import { getData, saveData } from "../utils/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL + "customers";

export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch customers");
    const data = await response.json();
    await saveData("customers", data); // cache
    return data;
  } catch (e) {
    // fallback to cache
    const cached = await getData("customers");
    return cached || [];
  }
};
