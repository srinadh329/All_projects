import { Component, OnInit, HostListener, Output, ViewChild, PipeTransform, Pipe, TemplateRef } from '@angular/core';

import { MessageService } from '../services/message.service';

import { FrontEndConfig } from '../frontendconfig';
import { UserService } from '../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';




@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    console.log(this.sanitized.bypassSecurityTrustHtml(value))
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  date = new Date()
  blogdata: any;
  data: any;
  blogstitle: any
  blogcontent: any
  blogdescription: any
  divheight: number;
  blogcomments: any
  data1
  imageUploadUrl
  serverurl = this.frontendconfig.getserverurl();
  imagedata: any;
  filesToUpload: File[];
  loginuserdata
  showblog
  Blog
  blogId
  profile
  blogprofile
  from_date
  @ViewChild('blogSuccess', { static: false }) blogSuccess: TemplateRef<any>;

  constructor(public dialog: MatDialog, private messageservice: MessageService, private route: ActivatedRoute, private router: Router, private frontendconfig: FrontEndConfig, private userservice: UserService) {
    this.loginuserdata = JSON.parse(localStorage.getItem('userdetails'));
    this.blogvalues = JSON.parse(localStorage.getItem('blogDetails'));
    this.profile = JSON.parse(localStorage.getItem('blogPicId'));
    console.log(this.profile);

    this.profile != null ? this.userservice.getblogpic(this.profile).subscribe(data => {
      console.log(data);
      this.blogprofile = data
    }) : ""
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.Blog = params.select
      this.blogId = params.id

    })
    this.divheight = window.innerHeight;
    this.messageservice.showblog().subscribe(data => {
      this.showblog = data

      console.log(this.showblog);



    })
  }

  @HostListener('window:resize') onWindowResize() {
    this.divheight = window.innerHeight;

  }




  selectedimg
  file
  imagePreview
  blogPicId

  blogProfile(e) {
    if (e) {
      this.selectedimg = e

      this.file = e.target.files[0];

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;

      };
      reader.readAsDataURL(this.file)


      this.filesToUpload = <Array<File>>this.selectedimg.target.files[0];
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;

      formData.append("uploads[]", files, files['name']);
      this.userservice.saveFiles(formData).subscribe(data => {
        this.imagedata = data;
        console.log(this.imagedata);

      })

    }
  }
  blogvalues
  blogDescriptionData(data) {
    console.log(data);

    if (data.valid) {
      console.log(data.value);
      this.from_date=data.value.from_date
      this.blogvalues = data.value
      localStorage.setItem('blogDetails', JSON.stringify(data.value));
      this.imagedata ? this.blogPicId = this.imagedata[0]._id : this.blogPicId = null
      this.imagePreview ? localStorage.setItem('blogPicId', JSON.stringify(this.blogPicId)) : localStorage.setItem('blogPicId', JSON.stringify(null))

      this.router.navigate(['/navbar/blog'], { queryParams: { select: 'Blog Content' } })
      this.imagePreview ?  this.userservice.getblogpic(this.blogPicId).subscribe(data => {
        console.log(data);
        this.blogprofile = data
      }) : this.blogprofile = null
    }
   
    this.imagePreview = ""

  }

  blog
  ChangeInBlog
  match1
  match2
  blogsdetails
  blogpic
  onBlog(blogdata) {
    console.log(blogdata);

    if (blogdata.valid) {
      console.log(blogdata.value);


      this.blogsdetails = JSON.parse(localStorage.getItem('blogDetails'));

      this.blogpic = JSON.parse(localStorage.getItem('blogPicId'));


      console.log(this.blogstitle, this.blogsdetails, this.blogpic);

      this.ChangeInBlog = blogdata.value.blogcontent.replace(/class="ql-align-/g, 'style="text-align:').replace(/class="ql-syntax ql-align-/g, 'style="background-color: #e0e0e0;border-radius: 10px;color: rgba(0,0,0,.9);font-family: Consolas,monospace;margin-bottom: 10px;overflow: auto;padding: 10px;"').replace(/class="ql-syntax" spellcheck="false"/g, 'style="background-color: #e0e0e0;border-radius: 10px;color: rgba(0,0,0,.9);font-family: Consolas,monospace;margin-bottom: 10px;overflow: auto;padding: 10px;"').replace(/img/g, "img height=40% width=50%").replace(/class="ql-video"/g, ' width="400" height="300" style="display:block;margin:auto;"').replace(/class="ql-video ql-align-center"/g, ' width="400" height="300;margin:auto;"').replace(/class="ql-video ql-align-justify"/g, ' width="400" height="300;margin:auto;"').replace(/class="ql-video ql-align-justify"/g, ' width="400" height="300;margin:auto;"').replace(/class="ql-video ql-align-right"/g, ' width="400" height="300;margin:auto;"')

      console.log(this.ChangeInBlog);

      this.blog = {
        blogtitle: this.blogsdetails.blogtitle,
        blogdescription: this.blogsdetails.blogdescription,
        from_date: this.blogsdetails.from_date,
        to_date: this.blogsdetails.to_date,
        blogcontent: this.ChangeInBlog,
        blogphoto: this.blogpic,
        userId: this.loginuserdata._id,
        org_id: ""
      };
      if (this.loginuserdata.roleid.role_id == 6) {
        var normalUserOrgId = "5e3a4f2cbce9993f682bbc49"

        this.blog.org_id = normalUserOrgId
      }
      else {
        this.blog.org_id = this.loginuserdata.organization_id._id
      }
      console.log(this.blog);


      this.messageservice.createData(this.blog).subscribe(data => {
        console.log(data);
         this.dialog.open(this.blogSuccess, {
          width: '800px',
          panelClass: 'blogSuccess',
          disableClose: true
        })

      })

    }

  }

  blogSuccesspopup() {

    this.router.navigate(['/navbar/blog'], { queryParams: { select: 'Create Blog' } })
    this.dialog.closeAll();
  }

  selectBlog(id) {
    this.router.navigate(['/navbar/blog'], { queryParams: { select: 'Show Blog', id: id } })
  }
}
