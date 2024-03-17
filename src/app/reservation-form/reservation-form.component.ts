import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({

  });

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', [Validators.required, Validators.min(1) ]],
    })
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if(id) {
      let reservation = this.reservationService.getReservation(id)

      if(reservation) {
        // fills out the form with values
        this.reservationForm.patchValue(reservation);
      }
    }
  }

  onSubmit() {
    if(this.reservationForm.valid) {

      let reservation: Reservation = this.reservationForm.value;

      let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

      if(id) {
        // Update
        this.reservationService.updateReservation(id, reservation)
      } else {
        //add as new
        this.reservationService.addReservation(reservation)
      }

      this.router.navigate(['/list'])
    }
  }

}
