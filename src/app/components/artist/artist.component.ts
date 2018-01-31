import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }  from "@angular/router";
import { SpotifyService } from "../../services/spotify.service";


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent implements OnInit {

  artista: any = {};
  tracks: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              public _spotify: SpotifyService) { }

  ngOnInit() {

    this.activatedRoute.params
          .map(params => params['id'])
          .subscribe(params =>{
            console.log(params);
            this._spotify.getArtista(params)
                      .subscribe(artista=>{
                        console.log(artista);
                        this.artista = artista;
                      })
            this._spotify.getTop(params)
                      .map((resp:any) => resp.tracks)
                      .subscribe(tracks=>{
                        console.log(tracks);
                        this.tracks = tracks;
                      })
          });
  }

}
