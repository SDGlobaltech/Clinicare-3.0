import { Observable } from "rxjs";
import io from "socket.io-client";
import { EnvoirnmentService } from "../services/envoirnment.service";
import { Injectable } from "@angular/core";

@Injectable()
export class SocketService {
  //private baseUrl: string;
  constructor(
    public env: EnvoirnmentService //@Inject("env") private env
  ) {
    //this.baseUrl = env.socketUrl;
  }

  //private url = this.baseUrl;
  private socket;

  initSocketQueue() {
    let observable = new Observable(observer => {
      this.socket = io(this.env.socketUrl, {
        secure: true
        //path: "/socket-service/socket.io"
      });
      this.socket.on("message", data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  initQueueSocket() {
    let observable = new Observable(observer => {
      this.socket = io(this.env.socketUrl, {
        secure: true
        //path: "/socket-service/socket.io"
      });
      this.socket.on("encounterToken", data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
