import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import "rxjs/add/operator/map";

@Injectable()
export class SpotifyService {

  artistas: any[] = [];
  urlSpotify: string = 'https://api.spotify.com/v1/';
  token: string = "BQDMqiQfidi_yGriYnbKjN--exoHxMSX4g45XhycK5F89OH9Y0ZWmoNCgvVFo_xJW4bmam25KJ2Wr8Q3ms4";

  constructor(public http: HttpClient) {
    console.log('Servicio de Spotify LISTO!');
  }

  private getHeaders(): HttpHeaders{
    let headers = new HttpHeaders({
      'authorization' : 'Bearer ' + this.token
    });
    return headers;
  }

  getTop(id: string){
    let url = `${this.urlSpotify}artists/${id}/top-tracks?country=US`;
    return this.http.get(url, {headers: this.getHeaders()})
  }

  getArtista(id:string ){
    let url = `${this.urlSpotify}artists/${id}`;
    return this.http.get(url, {headers: this.getHeaders()})
  }


  getArtistas(termino: string){
    let url = `${this.urlSpotify}search?query=${termino}&type=artist&offset=0&limit=20`;
    let headers = this.getHeaders();
    return this.http.get(url, {headers})
               .map((resp:any)  =>{
                 this.artistas = resp.artists.items;
                 return this.artistas;
                });
  }
}
