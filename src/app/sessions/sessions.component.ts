import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {
  
  public inscriptionForm: FormGroup;

  public inscription_steps: number = 2;
  public connexion_steps: number = 0;

  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.inscriptionForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sexe: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // ---------------Step function --------------- 
  incrementInscriptionStep(increment:number) {
      console.log(this.inscription_steps);

    switch(this.inscription_steps) {
      case 0: 
      this.inscription_steps = this.inscription_steps + increment;
      break;
      case 1:
        if (this.inscriptionForm.get('email')?.valid && this.inscriptionForm.get('email')?.touched) {
          this.inscription_steps = this.inscription_steps + increment;
        }
        break;
      case 2:
        if (this.inscriptionForm.get('firstName')?.valid && this.inscriptionForm.get('firstName')?.touched 
          && this.inscriptionForm.get('lastName')?.valid && this.inscriptionForm.get('lastName')?.touched 
          && this.isDateValid() === 1 && this.inscriptionForm.get('birthDate')?.touched && this.isSexeValid()){
                this.inscription_steps = this.inscription_steps + increment;            
        }
        break
      case 3:
        if (this.inscriptionForm.get('password')?.valid && this.inscriptionForm.get('password')?.touched){
          this.inscription_steps = this.inscription_steps + increment;
        }
        break
      case 4:
        if (this.isPasswordValid() > 0){
          this.inscription_steps = this.inscription_steps + increment;
        }
        break

    }
  }


  decrementIncriptionStep(increment = 1) {
    this.inscription_steps = this.inscription_steps - increment;
  }

  incrementConnexionStep(increment = 1) {
    this.connexion_steps = this.connexion_steps + increment;
  }

  decrementConnexionStep(increment = 1) {
    this.connexion_steps = this.connexion_steps - increment;
  }


  // ---------------Validation function ---------------

  public isValidField(formControlName: string): boolean {
    
    const field = this.inscriptionForm.get(formControlName);
    return (field?.valid && field?.touched) ?? false;
  }

  public isSexeValid(): boolean {
    const sexeControl = this.inscriptionForm.get('sexe');
    return sexeControl?.value === "F" || sexeControl?.value === "M";
  }

  public isDateValid(): number {
    const dateControl = this.inscriptionForm.get("birthDate");
    if (!dateControl || !dateControl.value) {
      return 0; // Si le champ n'est pas défini ou vide, retourner 0
    }
  
    const date = new Date(dateControl.value); // Convertir la valeur en objet Date
    const currentYear = new Date().getFullYear(); // Année actuelle
    const year = date.getFullYear(); // Extraire l'année de la date donnée
  
    if (year < 1900 || year > currentYear) {
      return 0; // Année inférieure à 1900 ou supérieure à l'année actuelle
    } else if (year > currentYear - 15) {
      return -1; // Année entre l'année actuelle - 15 ans et l'année actuelle
    } else {
      return 1; // Année entre 1900 et l'année actuelle - 15 ans
    }
  }
  
  isPasswordValid(): number {
    const passwordControl = this.inscriptionForm.get('password')?.value; // Récupère la valeur du mot de passe
    const length = passwordControl?.length; // Récupère la longueur du mot de passe
    
    if (!passwordControl || passwordControl === '') {
      return 0; // Si le champ est vide, retourne 0
    }
  
    if (length < 8) {
      return 0; 
    } else if (length === 8) {
      return 1; 
    } else if (length >= 9 && length <= 10) {
      return 2; 
    } else if (length === 11) {
      return 3; 
    } else {
      return 4;
    } 
  }
  
  
  
  

  //--------------- Set Input function ---------------

  public setSexeFeminin() {
    this.inscriptionForm.get('sexe')?.setValue('F');
  }

  public setSexeMasculin() {
    this.inscriptionForm.get('sexe')?.setValue('M');
  }

  // ---------------clear Input function ---------------
  public clearEmailInput() {
    this.inscriptionForm.get('email')?.setValue(''); // Efface la valeur de l'input
  }

  public clearfirstNameInput() {
    this.inscriptionForm.get('name')?.setValue(''); // Efface la valeur de l'input
  }

  public clearlastNameInput() {
    this.inscriptionForm.get('name')?.setValue(''); // Efface la valeur de l'input
  }

  public clearPasswordInput() {
    this.inscriptionForm.get('password')?.setValue(''); // Efface la valeur de l'input
  }


  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
