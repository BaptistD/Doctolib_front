import { Appointment } from './appointment.interface';

export interface User {
  firstName: string;
  lastName: string;
  sexe: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  password?: string;
  appointments: Appointment[];
}

export interface userRequest {
  firstName: string;
  lastName: string;
  sexe: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  password?: string;
  appointments: Appointment[];
}
