import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  static toast: ToastrService;
  constructor(private toast: ToastrService) {
      toast = this.toast;
  }

  static showToast(message: string, title: string): void {
    this.toast.success(message, title , {
      timeOut: 3000,
    });
  }
}
