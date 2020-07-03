import { Component, ViewChild, ElementRef } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';
import { VgAPI } from 'videogular2/compiled/core';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';

export interface IMedia {
    title: string;
    src: string;
    type: string;
}

@Component({ templateUrl: 'home.component.html',styleUrls: [ './home.component.css' ] })
export class HomeComponent {

  @ViewChild('fileUpload') fileUploadEl: ElementRef;
  
  percentDone: number;
  uploadSuccess: boolean;

  
    loading = false;
    users: User[];
    api: VgAPI;
    
    imgURL: any;
    imgURLReady: boolean = false;
    
    public message: string;
    
    
    constructor(private http: HttpClient,private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }


    stop() {
          this.api.pause();
          this.api.currentTime = 0;
          //this.setState(VG_STATES.STOP);
    }
    
    preview(event?: UIEvent) {
      this.imgURLReady = false;

      const files: FileList = this.fileUploadEl.nativeElement.files;
      console.log(files);
      if (!files || files.length === 0)
        return;
  
      var name = files[0].name;
      console.log(name);
     
      var mimeType = files[0].type;
      console.log(mimeType);
      
      if (mimeType.match(/video\/*/) == null) {
        this.message = "Only video are supported.";
        return;
      }
  
      var reader = new FileReader();
      //this.imagePath = files;
      reader.readAsDataURL(files[0]); 
      reader.onload = (_event) => { 
        //this.api.stop();
        this.imgURL = reader.result; 
        this.imgURLReady = true;
        if(this.api) {
          this.api.pause();
          //this.playVideo();
          this.api.play();
        }      
      }
    }

 


    onPlayerReady(api: VgAPI) {
       this.api = api;
       this.imgURLReady = true;

/** Listen for end of video
    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      this.currentVideo++;
      if(this.currentVideo == this.totalVideos) {
        this.classEnded = true;
      } else {
        this.setCurrentVideo(this.playlist[this.currentVideo].video_s3);

        this.onPlayerReady(this.api);

        this.api.play(); // Rarely works as it fires before video has loaded
      }
    });

    // Play video automatically
    this.api.getDefaultMedia().subscriptions.canPlayThrough.subscribe(() => {
      this.api.play();
    });

    this.api.getDefaultMedia().subscriptions.loadedData.subscribe(() => {
      this.api.play();
    });   
    */    
       //console.log('onPlayerReady ' + this.imgURLReady);
   }

   playVideo() {
        this.api.play();
       console.log('playVideo');
    }
}