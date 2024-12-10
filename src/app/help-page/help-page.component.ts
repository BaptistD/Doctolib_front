import { Component } from '@angular/core';
import { HelpHeaderComponent } from '../help-header/help-header.component';

@Component({
  selector: 'app-help-page',
  standalone: true,
  imports: [HelpHeaderComponent],
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.scss'
})
export class HelpPageComponent {

}