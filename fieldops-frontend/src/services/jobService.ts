import { Job } from '../types/Job';
import { getData, saveData } from '../utils/storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL + "jobs";

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    const data = await response.json();
    await saveData('jobs', data); // cache
    return data;
  } catch (e) {
    const cached = await getData('jobs');
    return cached || [];
  }
};

export const createJob = async (job: Partial<Job>) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  if (!response.ok) throw new Error('Failed to create job');
  return response.json();
};

export const updateJob = async (id: number, job: Partial<Job>) => {
  const response = await fetch(`${BASE_URL}?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  if (!response.ok) throw new Error('Failed to update job');
  return response.json();
};

export const deleteJob = async (id: number) => {
  const response = await fetch(`${BASE_URL}?id=${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete job');
  return response.json();
};
