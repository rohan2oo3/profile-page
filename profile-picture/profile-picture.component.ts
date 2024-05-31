import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {ModalController} from "@ionic/angular";
import {HeaderService} from "../../../shared/header.service";
import {base64ToFile, ImageCroppedEvent} from "ngx-image-cropper";
import {baseURL} from "../../../shared/shared";

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent {

  public pictureURL: any = './assets/avatar.svg';
  public imageFile: any = '';
  public croppedFile: any = '';
  public cropperVisibility: any = false;
  public serverErrorLog: any = null;
  public progress: any = null;
  constructor(public modalController: ModalController,
              public http: HttpClient,
              public header: HeaderService
  ) {
    const storedDpLink = localStorage.getItem('fullDpLink');
    if (storedDpLink != null) {
      this.pictureURL = storedDpLink;
    }
  }

  uploadFile(target: any) {
    const files = target.files;
    this.cropperVisibility = true;
    this.imageFile = files.item(0);

    /*let data;
    let formData: FormData = new FormData();
    data = new File([JSON.stringify(this.row)], "id.txt");
    formData.append('entryID', data);

    for (let i=0; i<files.length; i++) {
      formData.append('files', files.item(i));
    }
    this.progress = null;

    this.http.post(baseURL + "estimator/integrated/drawing/save/", formData, {
      headers: this.header.headers().headers,
      reportProgress: true,
      observe: "events"
    }).subscribe(
      res => {
        if (res.type === HttpEventType.Response) {
          this.filesArray = res.body;
          this.progress = null;
        }
        if (res.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * res.loaded / res.total);
        }
        this.clearFileInput(document.getElementById("file"));
      },
      err => {
        this.serverErrorLog = err.name;
        this.serverErrorLog += ': ';
        this.serverErrorLog += err.message;
      }
    );*/
  }

  imageCropped(file: ImageCroppedEvent) {
    if (file.base64 != null) {
      this.croppedFile = base64ToFile(file.base64);
    }
  }

  saveFile() {
    this.progress = null;
    if (this.croppedFile == null) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.croppedFile);

    let URIpath = '';

      URIpath = 'driver/upload-dp/';
      this.http.post(baseURL + URIpath, formData, {
      headers: this.header.headers().headers,
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      res => {
        if (res.type === HttpEventType.Response) {
          // this.filesArray = res.body;
          this.progress = null;
          this.pictureURL = JSON.parse(JSON.stringify(res.body)).fullDpLink;
          localStorage.setItem('tinyDpLink', JSON.parse(JSON.stringify(res.body)).tinyDpLink);
          localStorage.setItem('fullDpLink', JSON.parse(JSON.stringify(res.body)).fullDpLink);
          this.croppedFile = '';
          this.imageFile = '';
          this.cropperVisibility = false;
        }
        if (res.type === HttpEventType.UploadProgress) {
          /* TODO This part
          this.progress = Math.round(100 * res.loaded / res.total);
           */
        }
        this.clearFileInput(document.getElementById('file'));
      },
      err => {
        this.serverErrorLog = err.name;
        this.serverErrorLog += ': ';
        this.serverErrorLog += err.message;
      }
    );
  }

  cancel() {
    this.croppedFile = '';
    this.imageFile = '';
    this.cropperVisibility = false;
    this.clearFileInput(document.getElementById('file'));
  }

  clearFileInput(ctrl: any) {
    try {
      ctrl.value = null;
    } catch (ex) { }
    if (ctrl.value) {
      ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
    }
  }
}
