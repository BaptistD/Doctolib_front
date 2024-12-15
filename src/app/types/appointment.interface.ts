import { Specialist } from "./specialist.interface";

export interface Appointment {
    date: Date;
    time: string;
    specialist: Specialist;
}