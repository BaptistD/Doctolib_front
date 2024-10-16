import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {
  
  public inscriptionForm: FormGroup;

  public inscription_steps: number = 1;
  public connexion_steps: number = 0;

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
}
