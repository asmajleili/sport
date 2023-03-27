import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
playerUrl:string = "http://localhost:3000/players";
  constructor(private httpClient:HttpClient) { }





  addPlayer(obj){
    return this.httpClient.post<{message:any}>(this.playerUrl, obj);

  }

  getAllPlayer() {
    return this.httpClient.get<{players:any,message:any}>(this.playerUrl);
  }
  // request match by id
  // response:{}
  getPlayerById(id){

    return this.httpClient.get<{player:any}>(`${this.playerUrl}/${id}`);
  }

   // request delete match by id
  // response:msg

  deletePlayerById(id){

    return this.httpClient.delete(`${this.playerUrl}/${id}`);

  }

  editPlayer(newObj){

    return this.httpClient.put(this.playerUrl,newObj);

  }
}
