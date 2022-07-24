import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-documentverification',
  templateUrl: './documentverification.component.html',
  styleUrls: ['./documentverification.component.css']
})
export class DocumentverificationComponent implements OnInit {

  constructor(private documentService: DocumentService, public activatedroute: ActivatedRoute) {}

  ngOnInit() {

  }

  filesToUpload;
  fileName = 'Upload Document';
  result
  isLoading: boolean = false
  onFileSelected(fileInput: any) {
    console.log(fileInput)
    this.isLoading=true
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if (this.filesToUpload[0] && this.filesToUpload[0].type=='application/pdf') {
      if(this.filesToUpload[0].name) this.fileName = this.filesToUpload[0].name
      var formData: any = new FormData();
      formData.append("uploads", this.filesToUpload[0], this.filesToUpload[0].name);
      formData.append("type", "documentverification")
      this.documentService.verifydocument(formData).subscribe(res => {
        this.result = res
        this.isLoading=false        
        console.log(res)
      },error => {
        console.log(error)
        this.isLoading=false
        this.documentService.openSnackBar(error,'X')
      })
    }
    else {
      this.isLoading=false
      if(this.filesToUpload[0])
        this.documentService.openSnackBar("Choose Pdf file only", "X")
    }
  }

  upload(){
    if(!this.isLoading)
    document.getElementById('webportal_document').click()
  }
}
