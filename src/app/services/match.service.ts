import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  // server BE adresse
  matchUrl: string = "http://localhost:3000/matches"
  // declarer le hhtpclient
  constructor(private httpClient: HttpClient) { }



  // request to add match
  // response:msg
  addMatch(obj) {
    return this.httpClient.post<{message:string}>(this.matchUrl, obj);
  }
  // request all match
  // response:[{},{},{},{}]
  getAllMatches() {
    return this.httpClient.get<{matches:any,message:string}>(this.matchUrl);
  }
  // request match by id
  // response:{}
  getMatchById(id){

    return this.httpClient.get<{findedMatch:any}>(`${this.matchUrl}/${id}`);
  }

   // request delete match by id
  // response:msg

  deleteMatchById(id){

    return this.httpClient.delete<{message:string}>(`${this.matchUrl}/${id}`);

  }

// request edit match by id
  // response:msg
  editMatch(newObj){

    return this.httpClient.put<{message:string}>(this.matchUrl,newObj);

  }

  searchMatchByScore(obj){
    return this.httpClient.post(this.matchUrl+"/search",obj);
  }
}
