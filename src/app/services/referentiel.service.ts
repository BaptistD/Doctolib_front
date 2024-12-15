import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Specialist } from '../types/specialist.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReferentielService {
  private apiUrl = `${environment.apiUrl}/referentiel`;

  constructor(private http: HttpClient) {}

  public getSpecialists(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(`${this.apiUrl}/specialists`);
  }

  public addMultipleSpecialists(
    specialists: Specialist[]
  ): Observable<Specialist> {
    return this.http.post<Specialist>(
      `${this.apiUrl}/specialists/bulk`,
      specialists
    );
  }
}
