import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private alert: AlertService) { }
  onSubmit(form: NgForm): void {
    // Mark all fields as touched
    if (form.invalid) {

      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });

      this.alert.warning(
        'Invalid Form',
        'Please fill all fields correctly.'
      );
      return;
    }
    
      this.alert.success(
        'Message Sent!',
        'Thank you for contacting us.'
      );
       form.resetForm();
     setTimeout(()=>{
      window.location.reload();
     },2000);
     

    }
  }
