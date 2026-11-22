import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

 success(title: string, message: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      timer: 1500,
      confirmButtonText: 'OK',

      customClass: {
        popup: 'custom-swal success-border',
        confirmButton: 'swal-success-btn'
      }
    });
  }

  // ERROR
  error(title: string, message: string): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      timer: 2000,
      confirmButtonText: 'OK',

      customClass: {
        popup: 'custom-swal error-border',
        confirmButton: 'swal-error-btn'
      }
    });
  }

  // WARNING
  warning(title: string, message: string): void {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      timer: 1500,
      confirmButtonText: 'OK',

      customClass: {
        popup: 'custom-swal warning-border',
        confirmButton: 'swal-warning-btn'
      }
    });
  }

  // INFO
  info(title: string, message: string): void {
    Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      timer: 1500,
      confirmButtonText: 'OK',

      customClass: {
        popup: 'custom-swal info-border',
        confirmButton: 'swal-info-btn'
      }
    });
  }

  // CONFIRM
  confirm(title: string, message: string): Promise<boolean> {
    return Swal.fire({
      icon: 'question',
      title: title,
      text: message,

      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',

      customClass: {
        popup: 'custom-swal confirm-border',
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn'
      }
    }).then(result => {
      return result.isConfirmed;
    });
  }

  constructor() {}
}
