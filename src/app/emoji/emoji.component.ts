import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css']
})
export class EmojiComponent implements OnInit {

  selectedEmoji;
  EmojisArray:[];
  constructor(private cdref: ChangeDetectorRef, public dialogRef: MatDialogRef<MainComponent>,private UserService :UserService) { 


  }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  select(data) {
    console.log("emoji", data.emoji);
    this.UserService.sendEmojidata(data.emoji);
    // this.dialogRef.close(data.emoji);

  }

 
  
}


