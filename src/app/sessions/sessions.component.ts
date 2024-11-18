import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  incrementInscriptionStep(increment = 1) {
    this.inscription_steps = this.inscription_steps + increment;
    this.progress = this.progress + increment;
  }

  decrementIncriptionStep(increment = 1) {
    this.inscription_steps = this.inscription_steps - increment;
    this.progress = this.progress - increment;
  }

  incrementConnexionStep(increment = 1) {
    this.connexion_steps = this.connexion_steps + increment;
    this.progress = this.progress + increment;
  }

  decrementConnexionStep(increment = 1) {
    this.connexion_steps = this.connexion_steps - increment;
    this.progress = this.progress - increment;
  }

  isEmailInvalid() {
    const emailControl = this.inscriptionForm.get('email');
    return emailControl?.invalid && emailControl?.touched;
  }

  clearEmailInput() {
    this.inscriptionForm.get('email')?.setValue(''); // Efface la valeur de l'input
  }

  sexeFeminin() {
    this.sexe = 'F';
  }

  sexeMasculin() {
    this.sexe = 'M';
  }



}
