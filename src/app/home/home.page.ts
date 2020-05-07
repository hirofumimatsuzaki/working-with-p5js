import { Component, OnInit, ElementRef } from '@angular/core';
import * as p5 from 'p5';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  curve: any;
  canvasid:any;
  canvasSizeX = 720;
  canvasSizeY = 400;
  lineWidth=5;
  strokeColor=0;
  private ID = 'HomePage';
  log(func, line = '') {
    console.log(this.ID + '::' + func + '|' + line);
  }
  constructor(
    private el: ElementRef
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
      .createCanvas(this.canvasSizeX, this.canvasSizeY)
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
  exportImage(){
    const c:any = document.querySelector('#canvasContainer canvas');
    let dataUrl = c.toDataURL();
  }

}
