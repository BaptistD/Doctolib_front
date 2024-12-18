import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../types/user.interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { SuccessService } from '../services/success.service';
import { InscriptionSuccess } from '../types/inscriptionSuccess.interface';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
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
  public connexionForm: FormGroup;

  public inscription_steps: number = 0;
  public connexion_steps: number = 0;

  public succesInscription: InscriptionSuccess | null = null;

  public useConditions: boolean = false;

  public showPassword: boolean = false;

  public inscriptionError: Error = new Error();

  public allUsers: User[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private successService: SuccessService,
    private router: Router,
    private authService : AuthService
  ) {
    this.inscriptionForm = this.fb.group({
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sex: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    
    this.connexionForm = this.fb.group({
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
          && this.isDateValid() === 1 && this.inscriptionForm.get('dateOfBirth')?.touched && this.issexValid()){
                this.inscription_steps = this.inscription_steps + increment;            
        }
        break;
      
      case 3:
        if (this.inscriptionForm.get('password')?.valid && this.inscriptionForm.get('password')?.touched){
          this.inscription_steps = this.inscription_steps + increment;
        }
        break;
      
      case 4:
        if (this.inscriptionForm.get('phone')?.valid && this.inscriptionForm.get('phone')?.touched){
          this.inscription_steps = this.inscription_steps + increment;
        }
        break;

      case 5: 
        if (this.useConditions){
          this.inscription()
        }
        break; 

    }
  }

  decrementIncriptionStep(increment = 1) {
    this.inscription_steps = this.inscription_steps - increment;
  }

  // ---------------Connexion function ---------------
  incrementConnexionStep(increment = 1) {
    console.log(this.connexion_steps);
    switch(this.connexion_steps) {
      case 0: 
        this.connexion_steps = this.connexion_steps + increment;
        break;

      case 1:
        if (this.connexionForm.get('email')?.valid && this.connexionForm.get('email')?.touched) {
          this.connexion_steps = this.connexion_steps + increment;
        }
        break;
      case 2:
        if (this.connexionForm.get('password')?.valid && this.connexionForm.get('password')?.touched){
          this.connexion()
        }
        break;
    }
  }

  decrementConnexionStep(increment = 1) {
    this.connexion_steps = this.connexion_steps - increment;
  }


  // ---------------Validation function ---------------

  public isValidInscriptionField(formControlName: string): boolean {
    
    const field = this.inscriptionForm.get(formControlName);
    return (field?.valid && field?.touched) ?? false;
  }

  public isValidConnexionField(formControlName: string): boolean {
    const field = this.connexionForm.get(formControlName);
    return (field?.valid && field?.touched) ?? false;
  }

  public issexValid(): boolean {
    const sexControl = this.inscriptionForm.get('sex');
    return sexControl?.value === "F" || sexControl?.value === "M";
  }

  public isDateValid(): number {
    const dateControl = this.inscriptionForm.get("dateOfBirth");
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

  public setsexFeminin() {
    this.inscriptionForm.get('sex')?.setValue('F');
  }

  public setsexMasculin() {
    this.inscriptionForm.get('sex')?.setValue('M');
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

  public toggleUseConditions() {
    this.useConditions = !this.useConditions;
  }

  public inscription(): void {
    this.inscriptionForm.markAllAsTouched();
    if (this.inscriptionForm.valid) {
      this.userService
        .createUser(this.inscriptionForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.inscriptionError = error.error;
            return EMPTY;
          }),
          tap((res: Partial<User>) => {
            if (res) {
              const inscriptionSuccess: InscriptionSuccess = {
                succes: 'Inscription réussie',
                name: this.inscriptionForm.value.firstName,
                email: this.inscriptionForm.value.email,
              };
              this.successService.setInscriptionData(inscriptionSuccess);
              this.connexionForm.setValue({ email: this.inscriptionForm.value.email, password: this.inscriptionForm.value.password });
              this.inscription_steps = 0;
              this.connexion_steps = 2;
            }
          })
        )
        .subscribe();
    }
  }


  public getUsers$(): Observable<User[]> {
    return this.userService.getUsers();
  }


  public ngOnInit(): void {
    this.succesInscription = this.successService.getInscriptionData();

    if (this.succesInscription) {
      this.connexionForm.get('email')?.setValue(this.succesInscription.email);
    }
  }

  public connexion(): void {
    if (this.connexionForm.valid) {
      const { email, password } = this.connexionForm.value;
      this.authService
        .login(email, password)
        .pipe(
          tap((res) => {
            this.authService.saveToken(res.token.access_token);
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          })
        )
        .subscribe();
    }
  }


}
