import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertServiceService {
  constructor() {}

  success(msg: any) {
    Swal.fire({
      icon: 'success',
      text: msg,
      iconColor: '#00E9C5',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  error(error: any, time: number = 3000) {
    if (error?.errors) {
      const errors = Object.values(error?.errors).map(
        (item) => `<br /><li style="text-align: left;">${item}</li>`
      );
      const errorList: any = `<ul>${errors}</ul>`;
      Swal.fire({
        icon: 'error',
        html: errorList,
        showConfirmButton: false,
        timer: time,
      });
    } else if (error?.data) {
      Swal.fire({
        icon: 'error',
        html: error?.data,
        showConfirmButton: false,
        timer: time,
      });
    } else if (error?.message) {
      Swal.fire({
        icon: 'error',
        html: error?.message,
        showConfirmButton: false,
        timer: time,
      });
    } else {
      Swal.fire({
        icon: 'error',
        html: error || 'Ha ocurrido un error',
        showConfirmButton: false,
        timer: time,
      });
    }
  }
}
