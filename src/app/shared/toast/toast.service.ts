import { Injectable, signal } from '@angular/core';


export type Toast = {
  message: string,
  type: 'success' | 'error' | 'warning' | 'info',
  duration?: number
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts = signal<Toast[]>([]);

  addToast(toast: Toast){
    this.toasts.set(
      [
        ...this.toasts(),
        toast
      ]
    )

    setTimeout(() => {
      this.toasts.set(
        this.toasts().filter(t => t !== toast)
      )
    }, toast.duration?? 5000)
  }

  removeToast(toast: Toast){
    this.toasts.set(
      this.toasts().filter(t => t !== toast)
    )
  }
}
