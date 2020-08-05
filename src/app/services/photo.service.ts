import { Injectable } from '@angular/core';
import { Plugins, Capacitor, FilesystemDirectory, 
   } from '@capacitor/core';

const { Filesystem, Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Painting[] = [];
dataUrl:any;
  // other code

  constructor() { }

  public async addNewToGallery() {
    // canvas get
    const c:any=document.querySelector('#canvasContainer canvas');
    this.dataUrl=c.toDataURL();

 // Save the picture and add it to photo collection
 const savedImageFile = await this.savePicture(this.dataUrl);
 this.photos.unshift(savedImageFile);

  }

  private async savePicture(cameraPhoto: any) { 
      // Convert photo to base64 format, required by Filesystem API to save
  const base64Data = await this.readAsBase64(cameraPhoto);

  // Write the file to the data directory
  const fileName = new Date().getTime() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: FilesystemDirectory.Data
  });

  // Use webPath to display the new image instead of base64 since it's
  // already loaded into memory
  return {
    filepath: fileName,
    webviewPath: this.dataUrl
  };
  }

  private async readAsBase64(cameraPhoto: any) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;  
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

interface Painting {
  filepath: string;
  webviewPath: string;
  base64?: string;
}