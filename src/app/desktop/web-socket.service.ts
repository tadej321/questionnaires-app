import * as io from 'socket.io-client';
import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  socket: any;

  constructor() {
  }

  public initSocket(): void {
    this.socket = io(`${environment.backendApiUrl}`);
  }

  public disconnectSocket(): void {
    this.socket.disconnect();
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
