import { Appointment } from './appointment.interface';

export interface Specialist {
  firstName: string;
  lastName: string;
  adresse: string;
  speciality: string;
  pricing: number;
  appointments: Appointment[];
}

