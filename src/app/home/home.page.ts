import { Component, OnInit, ElementRef } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Platform, ToastController } from '@ionic/angular';
import * as p5 from 'p5';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  photos = this.photoService.photos;
  curve: any;
  canvasid:any;
  canvasSizeX = 720;
  canvasSizeY = 400;
  lineWidth=5;
  strokeColor=0;
img:any;
  private ID = 'HomePage';
  log(func, line = '') {
    console.log(this.ID + '::' + func + '|' + line);
  }
  constructor(
    private el: ElementRef,public photoService: PhotoService,public toastController: ToastController
  ) {
    this.log('constructor');
  }
  ngOnInit() {
    this.log('ngOnInit');
    const p5obj = new p5(p => {
      p.setup = () => {
        this.setup(p);
      };
      p.draw = () => {
        this.draw(p);
      };
    }, this.el.nativeElement);
  }
  setup(p) {
    this.log('setup');
    const c = document.querySelector('#canvasContainer');
    p
      .createCanvas(this.canvasSizeX, p.displayHeight-this.canvasSizeY)
      .parent(c);
      p.
        background('lightgray');
     
  }

  draw(p) {
    p.strokeWeight(this.lineWidth);
    p.stroke(this.strokeColor);

    if(p.mouseIsPressed){
    p.line(p.mouseX,p.mouseY,p.pmouseX,p.pmouseY);

   }

  }
 
 
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your paintingss have been saved.',
      duration: 2000
    });
    toast.present();
  }
}
