//aqui solo importo el client
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = "https://www.googleapis.com/youtube/v3";
  private apiKey="AIzaSyBsp3Lf9MmicgdoWouyuHFJKFzAjw5ugqE";
  private playList ="UUuaPTYj15JSkETGnEseaFFg";
  private nextPageToken="";

  constructor(private http: HttpClient) {
  }

  getVideos(){

    //http params nos permie enviar todos los endpoint de url de manera mas ordenada
    const url = `${this.youtubeUrl}/playlistItems`

    const params = new HttpParams()
    .set('part','snippet')
    .set('maxResults','10')
    .set('playlistId',this.playList)
    .set('key',this.apiKey)
    //pageToken vacio
    .set('pageToken',this.nextPageToken)
    //en el get le especifico que informaciono va a arrojar...le digo que sera de tipo youtube response..(modelo creado)
                              //params: params
    return this.http.get<YoutubeResponse>(url,{params})
    .pipe(
      map(resp=>{
        //hacemos la asignacion del page token
        this.nextPageToken = resp.nextPageToken;
        return resp.items
      }),

      map(items=>
        //con este map barrerá cada item del arreglo de items
        items.map(video =>video.snippet)
      )
    );
  }
}
