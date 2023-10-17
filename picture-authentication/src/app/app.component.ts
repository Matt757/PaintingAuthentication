import { Component } from '@angular/core';
import { FileUploadService } from './services/file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: any; // Variable to store file
  ImageUrl: any;
  FileImage: any;
  msg: string = '';
  authentic: boolean = false;
  paintingSelected: boolean = false;
  feedbackGiven: boolean = false;

  // Inject service
  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {}

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

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.ImageUrl = reader.result;
    };
  }

  checkPainting() {
    this.paintingSelected = true;
    this.authentic = true;
  }

  selectIcon(event: any) {
    event.target.classList.add('selected-icon');
    this.feedbackGiven = true;
  }
}
