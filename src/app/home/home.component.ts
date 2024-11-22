import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public medicForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.medicForm = this.fb.group({
      Name: ['', Validators.required],
      Speciality: ['', Validators.required],
      etablissement: ['', Validators.required],
      Location: ['', Validators.required],
    });
  }

  getUserLocation(): void {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          alert(`Votre position : \nLatitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Vous devez autoriser la localisation pour continuer.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("La localisation n'est pas disponible pour le moment.");
              break;
            case error.TIMEOUT:
              alert("La demande de localisation a expiré.");
              break;
            default:
              alert("Erreur inconnue lors de la géolocalisation.");
          }
        }
      );
    } else {
      alert("Votre navigateur ne prend pas en charge la géolocalisation.");
    }
  }
}


