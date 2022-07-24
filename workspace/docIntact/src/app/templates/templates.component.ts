import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { MatDialog } from '@angular/material';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
declare var $: any;
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  constructor(private documentService: DocumentService, public dialog: MatDialog) { }
  templatename: any;
  TemplateName;
  iebrowser
  ngOnInit() {
    if(!!(window as any).MSInputMethodContext && !!(document as any).documentMode) 
    { 
$(".ietop").css("margin-top","100px");
    this.iebrowser=true
     }
     else this.iebrowser=false
    this.templatename = "";
    this.GetListOftemplates();
  }
  test1: boolean = true
  test2: Boolean;
  templates = [];
  id
  templateedit = false // Template Edit Button
  selectedTemplateId: any;
  templateid
  buttonhide
  isloading: boolean = false;
  copdocument;
  lastSelect;
 
  // to get template of particular document
  GetListOftemplates() {
    this.isloading = true;
    this.documentService.gettempltes().subscribe((data: any) => {
      this.templates = data
      this.templateedit = false;
      this.isloading = false;
    })
  }
  editTemplatename(t) {
   this.copdocument = Object.assign({}, t)
   this.TemplateName = t.templatename;
   this.templateid = t._id;
    this.selectedTemplateId = t._id;
    this.templateedit = true;
    this.buttonhide = t._id;
    this.lastSelect=t._id
    }

    Selected(t){
      if(this.lastSelect!=t._id)this.templateedit=false;
    }
  
  cancelButton(data) {
    data.templatename = this.TemplateName;
    this.templateedit = false;
  }
  ModifyTemplate(data, title) {
    if (title == 'delete') {
      if (this.buttonhide != data._id) this.templateedit = false;
      this.selectedTemplateId = data._id;
      data.istemplate = false
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'DeleteTemplate', content:"You want to delete the Template." }, width: '500px', panelClass: "deletemod" });
      dialogRef.afterClosed().subscribe(res => {
        if (res == 'DeletedTemplate') {
          var index = this.templates.findIndex(x => x._id == data._id)
          if (index >= 0) {
            this.templates.splice(index, 1)
            this.documentService.edittemplate(data).subscribe((data: any) => {
              this.templateedit = false;
            });
            this.documentService.openSnackBar("Template has been deleted Successfully.", "X");
          }
        }
      });
    }
    if (data.templatename == "") this.documentService.openSnackBar("Enter Template Name", "X")
    if (data.templatename != "" && title == 'edit' ) {
      this.isloading = true;
      this.templateedit = false;
      this.documentService.edittemplate(data).subscribe((data: any) => {
        this.documentService.gettempltes().subscribe((data: any) => {
          this.templates = data
          this.templateedit = false;
          this.isloading=false;
        });
        this.documentService.openSnackBar("Template Updated Successfully", "X");
      });
    }



  }

  tempNameAsc() {

    this.templates.sort(function (a, b) {
      var nameA = a.templatename
      var nameB = b.templatename
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
  }

  tempNameDsc() {

    this.templates.sort(function (a, b) {
      var nameA = a.templatename
      var nameB = b.templatename
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
  }

  tempCreatedDateAsc() {

    this.templates.sort(function (a, b) {
      var nameA = a.created_at
      var nameB = b.created_at
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
  }

  tempCreatedDateDsc() {

    this.templates.sort(function (a, b) {
      var nameA = a.created_at
      var nameB = b.created_at
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
  }
}
