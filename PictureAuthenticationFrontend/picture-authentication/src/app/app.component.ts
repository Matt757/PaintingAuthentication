import { Component } from '@angular/core';
import { FileUploadService } from './services/file-upload.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Variable to store shortLink from api response
  file: any; // Variable to store file
  ImageUrl: any;
  msg: string = '';
  authentic: boolean = false;
  paintingSelected: boolean = false;
  feedbackGiven: boolean = false;
  paintingType: string = '';
  showSpinner = false;

  // Inject service
  constructor(private http: HttpClient) {}

  // On file Select
  onChange(event: any) {
    this.msg = '';
    this.paintingSelected = false;
    this.authentic = false;
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      this.ImageUrl = null;
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      this.ImageUrl = null;
      return;
    }

    this.file = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.ImageUrl = reader.result;
    };
  }

  checkPainting() {
    this.showSpinner = true;
    let testData: FormData = new FormData();
    testData.append('file_upload', this.file, this.file.name);
    this.http
      .post('http://127.0.0.1:5000', testData)
      .subscribe((response: any) => {
        this.showSpinner = false;
        this.getPaintingType(response.result);
      });
  }

  getPaintingType(list: any) {
    console.log(list);
    const paintingType = list.reduce((prev: any, current: any) => {
      return prev.value > current.value ? prev : current;
    });
    console.log(paintingType);
    switch (paintingType.key) {
      case 'VincentVanGogh': {
        this.paintingType = 'Van Gogh';
        this.paintingSelected = true;
        this.authentic = true;
        break;
      }
      case 'VincentVanGoghForgeries': {
        this.paintingType = 'Van Gogh';
        this.paintingSelected = true;
        this.authentic = false;
        break;
      }
    }
  }

  selectIcon(event: any) {
    event.target.classList.add('selected-icon');
    this.feedbackGiven = true;
  }
}
