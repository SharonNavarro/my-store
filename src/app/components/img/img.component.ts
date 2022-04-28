import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() img: string = "https://picsum.photos/200";
  @Output() loaded = new EventEmitter<string>()
  imageDefault = "../../../assets/default.png";
  counter = 0;

  constructor() {
    //before render
    //async -- one time
    console.log('constructor', 'imgValue =>', this.img)
  }

  ngOnChanges() {
    //before render
    //changes inputs -- times
    console.log('ngOnChanges', 'imgValue =>', this.img)
  }

  ngOnInit(): void {
    //before render
    //asyn - fetch -- once time
    console.log('ngOnInit', 'imgValue =>', this.img);
    window.setInterval(() => {
      this.counter += 1;
      console.log('run counter');
    }, 1000)
  }

  ngAfterViewInit(): void {
    //after render
    //handler children
    console.log('ngAfterViewInit')
  }

  ngOnDestroy() {
    //delete
    console.log('ngOnDestroy')
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log("log hijo")
    this.loaded.emit(this.img)
  }

}
