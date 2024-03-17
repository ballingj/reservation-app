import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

    private reservations: Reservation[] = [];

    constructor() {
      let savedReservations = localStorage.getItem("reservations");
      this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
    }

    // CRUD Operations
    // Create
    addReservation(reservation: Reservation): void {
      reservation.id = Date.now()
      this.reservations.push(reservation);
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  
    // Read all
    getReservations(): Reservation[] {
      return this.reservations;
    }
    // Read by id
    getReservation(id: number): Reservation | undefined {
      return this.reservations.find (res => res.id === id);
    }

    // Update
    updateReservation(id: number, updatedReservation: Reservation): void {
      let index = this.reservations.findIndex(res => res.id === id);
      this.reservations[index] = updatedReservation;
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }

    // Delete
    deleteReservation(id: number): void {
      let index = this.reservations.findIndex(res => res.id === id);
      this.reservations.splice(index, 1);
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }

}
