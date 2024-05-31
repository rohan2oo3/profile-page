import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfilePictureComponent} from "./profile-picture.component";
import {IonicModule} from "@ionic/angular";
import {MatButton} from "@angular/material/button";
import {ImageCropperComponent} from "ngx-image-cropper";



@NgModule({
  declarations: [ProfilePictureComponent],
  exports: [ProfilePictureComponent],
  imports: [
    CommonModule,
    IonicModule,
    MatButton,
    ImageCropperComponent
  ]
})
export class ProfilePictureModule { }
