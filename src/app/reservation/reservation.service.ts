import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

    private apiUrl = "http://localhost:3001"
    private reservations: Reservation[] = [];

    constructor(private http: HttpClient){}

    // CRUD Operations
    // Create
    addReservation(reservation: Reservation): Observable<void> {
      return this.http.post<void>(this.apiUrl + "/reservation", reservation);
    }
  
    // Read all
    getReservations(): Observable<Reservation[]> {
      return this.http.get<Reservation[]>(this.apiUrl + "/reservations");
    }

    // Read by id
    getReservation(id: number): Observable<Reservation> {
      // return this.reservations.find (res => res.id === id);
      return this.http.get<Reservation>(this.apiUrl + "/reservation/"+id);
    }

    // Update
    updateReservation(id: number, updatedReservation: Reservation): Observable<void> {
      return this.http.put<void>(this.apiUrl + "/reservation/"+id, updatedReservation);
      
    }

    // Delete
    deleteReservation(id: number): Observable<void> {
      return this.http.delete<void>(this.apiUrl + "/reservation/"+id);

    }

}
