import { Injectable } from '@angular/core';
import { Plugins, Capacitor, FilesystemDirectory, 
   } from '@capacitor/core';

const { Filesystem, Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Painting[] = [];

  // other code

  constructor() { }
  public async addNewToGallery() {
    // canvas get
    const c:any=document.querySelector('#canvasContainer canvas');
    let dataUrl=c.toDataURL();


    this.photos.unshift({
      filepath: "soon...",
      webviewPath: dataUrl
    });
  }
}
interface Painting {
  filepath: string;
  webviewPath: string;
  base64?: string;
}