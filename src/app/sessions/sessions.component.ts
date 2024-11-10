import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {
  
  public inscriptionForm: FormGroup;

  public inscription_steps: number = 0;
  public connexion_steps: number = 0;
  public sexe: string = '';

  public progress: number = 0;

  constructor(
    private fb: FormBuilder,
  ) {
    this.inscriptionForm = this.fb.group({
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sexe: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  incrementInscriptionStep() {
    this.inscription_steps++;
    this.progress++;
  }

  decrementIncriptionStep() {
    this.inscription_steps--;
    this.progress--;
  }

  incrementConnexionStep() {
    this.connexion_steps++;
    this.progress++;
  }

  decrementConnexionStep() {
    this.connexion_steps--;
    this.progress--;
  }

  sexeFeminin() {
    this.sexe = 'F';
  }

  sexeMasculin() {
    this.sexe = 'M';
  }

}
