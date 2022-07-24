import { Component, OnInit, HostListener, ViewChild, TemplateRef, Pipe, PipeTransform } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    console.log(this.sanitized.bypassSecurityTrustHtml(value))
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-bolog-control',
  templateUrl: './bolog-control.component.html',
  styleUrls: ['./bolog-control.component.css']
})
export class BologControlComponent implements OnInit {
  UserBlogs
  selectedBlog
  divheight: number;
  @ViewChild('showBlog', { static: false }) showBlog: TemplateRef<any>;
  
  constructor(private userService:UserService,public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getBlogs().subscribe(data=>{
      console.log(data);
      this.UserBlogs=data
    })
    this.divheight = window.innerHeight - 200;
  }
  @HostListener('window:resize') onWindowResize() {
    this.divheight = window.innerHeight - 200;

  }
  blogData(id)
  {
    this.selectedBlog=id
    console.log(id);
    this.dialog.open(this.showBlog, {
      width: '800px',
      height: '800px',
      panelClass: 'blogSuccess',
      // disableClose: true
    })
  }
}
