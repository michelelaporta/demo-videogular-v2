import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';
import { VgAPI } from 'videogular2/compiled/core';

export interface IMedia {
    title: string;
    src: string;
    type: string;
}

@Component({ templateUrl: 'home.component.html',styleUrls: [ './home.component.css' ] })
export class HomeComponent {
  playlist: Array<IMedia> = [
        {
            title: 'Pale Blue Dot',
            src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
            type: 'video/mp4'
        },
        {
            title: 'Big Buck Bunny',
            src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
            type: 'video/mp4'
        },
        {
            title: 'Elephants Dream',
            src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
            type: 'video/mp4'
        }
    ];
    loading = false;
    users: User[];
    api: VgAPI;
    currentIndex = 0;
    //currentItem: IMedia = this.playlist[ this.currentIndex ];
    currentItem: IMedia = this.playlist[ this.currentIndex ];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    onPlayerReady(api: VgAPI) {
       this.api = api;
   }

   playVideo() {
        this.api.play();
    }
}