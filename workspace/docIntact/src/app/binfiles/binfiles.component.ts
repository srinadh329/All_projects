import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { DocumentService } from '../document.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { CommonDialogComponent } from 'src/app/common-dialog/common-dialog.component'
import { MatDialog } from '@angular/material'
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UserService } from '../user.service';
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-binfiles',
  templateUrl: './binfiles.component.html',
  styleUrls: ['./binfiles.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BinfilesComponent implements OnInit {

  fileElements: any = [];  // stores deleted file list
  folderElements: any = []; //stores deleted folder list
  filterData: any; // stores the content for search
  errorshow = false;  // to display the error if FROM and END Date is not selected
  maxDate: any; // minimum date in calender
  minDate: any; // max date in calender
  TableView = false;  // to show in table view
  showGridView: Boolean = true; // to show in grid view
  selectedName: any; // stores selected name
  element: any; // stores selected element
  sample22: boolean = true; 4
  toMinDate;
  frommaxdate = new Date();
  isloading: boolean = true;
  sample2: boolean;
  matmenu: any;
  canNavigateUp: boolean = false;
  todate: any;
  filearr:any=[];
  folderarr:any=[]
  ButtonsDisable:Boolean=false;
  myplaceHolder1:String=' Choose Date'
  myplaceHolder2:String=' Choose Date'
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  iebrowser
  matttoltip
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if(event.ctrlKey && event.keyCode==65) {
      this.filearr = this.fileElements;
      this.folderarr = this.folderElements;
      event.preventDefault();
    }
    if(event.keyCode==46){
      if((this.filearr.length>1 || this.folderarr.length>1)||(this.filearr.length==1 && this.folderarr.length==1)){
        this.multipleDelete()
      }
      else if((this.filearr.length || this.folderarr.length)){
        this.delete(this.filearr[0] || this.folderarr[0])
      }

    }
  }
  @HostListener('document:click', ['$event']) onClickHandler(event: MouseEvent) {
    var value:any = event.srcElement;
    if(value.id!="foldersList" && value.id!="filesList" && !(this.contextMenu &&this.contextMenu.menuOpened.closed) ) {
      this.filearr = []
      this.folderarr = [];
      this.ButtonsDisable=false;
    }
  }
  @HostListener('window:scroll', ['$event'])
onWindowScroll($event) {
    if(this.contextMenu) this.contextMenu.closeMenu()
    this.matttoltip=true
    setTimeout(() => { 
      this.matttoltip=false
    }, 1);
}
  constructor(public dialog: MatDialog, private userservice: UserService, private documentservice: DocumentService) { }

  ngOnInit() {
this.myplaceHolder1='Choose Date'
this.myplaceHolder1='Choose Date'
    if (!!(window as any).MSInputMethodContext && !!(document as any).documentMode) {
      $(".ietop").css("margin-top", "100px");
this.iebrowser=true
    }
    else this.iebrowser=false
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.minDate = new Date(2019, 1, 0);
    this.maxDate = new Date(year, month, day);
    this.getDeletedList();
  }

  toMinDateEvent(event: MatDatepickerInputEvent<Date>) {
    this.toMinDate = event.value;
  }

  //To get the deleted folders and documents---------------------------------------------------------------------------------------
  getDeletedList() {
    this.isloading = true;
    var result;
    this.documentservice.trashfolders().subscribe(data => {
      result = data
      this.folderElements = result.folders;
      this.fileElements = result.documents;
      this.isloading = false
    })
  }

  // To delete all Documents or folders--------------------------------------------------------------------------------------------
  deleteAllFiles() {
    setTimeout(() => {
      $('body').css("overflow", "hidden");
       }, 10);
    let dialogRef = this.dialog.open(CommonDialogComponent, { width: '500px', panelClass: "deletemod", data: { name: 'trashdelete', },disableClose:true });
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow", "auto");
         }, 10);
      if (res) {
        this.documentservice.deleteAllFilesFolder().subscribe(data => {
          this.fileElements = [];
          this.folderElements = [];
        })
      }
    });
  }

  // Search-------------------------------------------------------------------------------------------------------------------------
  filterdate(search) {
    var result;
    if (!search.value.fromdate || !search.value.todate) this.errorshow = true;
    else {
      this.errorshow = false;
      this.filterData = {};
      this.filterData.where = {};
      let d = new Date(search.value.fromdate);
      let sevenDaysFromNow = d.setDate(d.getDate() + 0);
      let FromNow = new Date(sevenDaysFromNow)
      let d1 = new Date(search.value.todate);
      let sevenDaysFromNow1 = d1.setDate(d1.getDate() + 1);
      let To = new Date(sevenDaysFromNow1)
      if (search.value.fromdate) this.filterData.where.updatedAt = { $gte: FromNow }
      if (search.value.todate) this.filterData.where.updatedAt = { $lt: To }
      if (search.value.fromdate && search.value.todate) this.filterData.where.updatedAt = { $gte: FromNow, $lt: To }
      this.documentservice.searchfolders(this.filterData).subscribe(data => {
        result = data
        this.folderElements = result.folders;
        this.fileElements = result.documents;
      });
    }
  }
  files:any = [];  
  folders:any = [];  
  folderlists:any
  // to restore the doument or Folder-----------------------------------------------------------------------------------------------
  restoreElement(restore, content) {
    if(content) {
      console.log(content)
      var contentdata=[]
      contentdata =content.split(',')
      console.log(contentdata)
    }

    var fileslists  =this.filearr;
     this.folderlists= this.folderarr;
     setTimeout(() => {
      $('body').css("overflow", "hidden");
       }, 10);
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'restore1', content: contentdata[0],data:contentdata[1] }, width: '500px', panelClass: "deletemod",disableClose:true });
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow", "auto");
         }, 10);
      if (res == "restore") {    
        if(fileslists.length!=0){
        fileslists.forEach(element => {
          this.fileElements.forEach(originalElement=>{
            if(element._id==originalElement._id){
              element.active=true
              this.files.push(element)
            }
          })
        });
       this.documentservice.updatefolder1(this.files).subscribe(data => { 
        });
        this.files.forEach(element => {
            var index = this.fileElements.findIndex(x => x._id == element._id);
          this.fileElements.splice(index, 1);

        });
      } if(this.folderlists.length!=0){
      this.folderlists.forEach(element => {
        this.folderElements.forEach(originalElement=>{
          if(element._id==originalElement._id){
            element.active=true
            this.folders.push(element)
          }
        })
      });
    this.documentservice.restorefolder({folderarray:this.folders,delete:true}).subscribe(data => {
     });
      this.folders.forEach(element => {
        var index = this.folderElements.findIndex(x => x._id == element._id);
      this.folderElements.splice(index, 1);
    });
    }
        // if (index < 0) {
        //   var index = this.folderElements.findIndex(x => x._id == restore._id);
        //   this.folderElements.splice(index, 1)
        // }
        // if (index != -1) {
        //   restore.delete = true;
      // this.documentservice.updatefolder1(this.files).subscribe(data => { });
          this.documentservice.openSnackBar("Restored Successfully ", "X")
        // }
      }
    });
  }


  // function to delete the folders or documents-----------------------------------------------------------------------------------
  delete = async function (del) {
    console.log(del)
    var finalArray = [];
    finalArray.push(del);
    while (finalArray.length) {
      await this.documentservice.folderDeletion(finalArray[0]._id, del).subscribe(res => { 
        this.multipleDelete=false;
       if(!del.isFolder) this.documentservice.openSnackBar("File(s) deleted successfully","X");
      })
      finalArray.splice(0, 1);
    }
  }
  seldate()
  {
    this.myplaceHolder1=''
  }
  seledate()
  {
    this.myplaceHolder2=''
  }
  // To delete the selected Files or folders peremenently--------------------------------------------------------------------------
  deleteFF(del) {
    if((this.filearr.length>1 || this.folderarr.length>1)||(this.filearr.length==1 && this.folderarr.length==1)){
    this.multipleDelete()
    }
  else{ 
     if (del.isFolder) {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'DeleteTemplate',content:"You want to delete Folder(s) permanently."}, width: '500px', panelClass: "deletemod",disableClose:true });
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
        if (res) {
          this.documentservice.openSnackBar("Folder(s) deleted successfully","X");
          var index = this.folderElements.findIndex(x => x._id == del._id)
          if (index >= 0) {
            this.folderElements.splice(index, 1)
            this.delete(del);
          }
        }
       
      });
      
    }
    else {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'DeleteTemplate' ,content:"You want to delete File(s) permanently." }, width: '500px', panelClass: "deletemod",disableClose:true });
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
        if (res) {
          var index = this.fileElements.findIndex(x => x._id == del._id)
          if (index >= 0) {
            this.fileElements.splice(index, 1)
            this.delete(del);
          }
        }
       
      });
      
    }
  }
  }


  // Sort By name on Table View in Asc order========================================================================================
  sortByNameAsc() {
    this.folderElements.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA < nameB) { return -1; }
      if (nameA > nameB) { return 1; }
      return 0;
    })
    this.fileElements.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA < nameB) { return -1; }
      if (nameA > nameB) { return 1; }
      return 0;
    })
  }

  // Sort By name on Table View in Dsc order
  sortByNameDsc() {
    this.fileElements.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return -1; }
      if (nameA < nameB) { return 1; }
      return 0;
    })
    this.folderElements.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return -1; }
      if (nameA < nameB) { return 1; }
      return 0;
    })
  }

  // Sort By Moodified Date on Table View in Dsc order
  sortByModifiedAsc() {
    this.fileElements.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA < nameB) { return -1; }
      if (nameA > nameB) { return 1; }
      return 0;
    })
    this.folderElements.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA < nameB) { return -1; }
      if (nameA > nameB) { return 1; }
      return 0;
    })
  }

  // Sort By Moodified Date on Table View in Asc order
  sortByModifiedDsc() {
    this.fileElements.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA > nameB) { return -1; }
      if (nameA < nameB) { return 1; }
      return 0;
    })
    this.folderElements.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA > nameB) { return -1; }
      if (nameA < nameB) { return 1; }
      return 0;
    })
  }
  multiselectpdf(element1,event) {
     if(event.ctrlKey){
      if(element1.isFile){
        if(!this.filearr.some(element => element._id == element1._id)) this.filearr.push(element1)
        else {
          var indexNum =this.filearr.findIndex((element)=> {
            return (element._id == element1._id);
          });
          this.filearr.splice(indexNum, 1);
        }
      }
      else if(element1.isFolder){
        if(!this.folderarr.some(element => element._id == element1._id)) this.folderarr.push(element1)
        else {
          var indexNum =this.folderarr.findIndex((element)=> {
            return (element._id == element1._id);
          });
          this.folderarr.splice(indexNum, 1);
        }
      }
    }
    else {
      if(element1.isFile){
        this.filearr=[element1]
        this.folderarr=[]
       }
       else if(element1.isFolder){
        this.folderarr=[element1]
        this.filearr=[]
       }
    }
if((this.filearr.length ==1 &&  this.folderarr.length ==1) || (this.filearr.length >1 || this.folderarr.length >1)) this.ButtonsDisable=true;
else this.ButtonsDisable=false;
}
  // highlight the selected file or folder 
  highlightRow(element) {
    this.selectedName = element._id;
    this.sample22 = false
    this.sample2 = true
    this.element = element;
    this.ButtonsDisable=true
  }


 

  //context menu or rightclick menu
  FileMenu = false;
  contextMenuPosition = { x: '0px', y: '0px' };
  openMenufolder(event: MouseEvent, element: Element) {
    this.matmenu = element
    this.selectedName = this.matmenu._id;
    this.FileMenu = true;
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.openMenu();
  } 
  //contextmenu for IPAD
  openMenufolder1(event: TouchEvent, element: Element) {
    this.matmenu = element
    this.selectedName = this.matmenu._id;
    this.FileMenu = true;
    event.preventDefault();
    this.contextMenuPosition.x = event.changedTouches[0].clientX + 'px';
    this.contextMenuPosition.y = event.changedTouches[0].clientY + 'px';
    this.contextMenu.openMenu();
  }
  getHighlight(data){
    if(data.isFile){
      if(this.filearr.some(element => element._id == data._id)) return true
      else return false
    }
    else if(data.isFolder){
      if(this.folderarr.some(element => element._id == data._id)) return true
      else return false
    }
    else return false
  } 
  // out side click to remove selected 
  show4() {
    this.selectedName = null;
    this.sample2 = false
  }

  // To change view of files and folders 
  changeView(title) {
    if (title == 'list') {
      this.TableView = true;
      this.showGridView = false
      this.selectedName = null;
    }
    if (title == 'grid') {
      this.TableView = false;
      this.showGridView = true
      this.selectedName = null;
    }
  }
  multipleDelete() {
    var folders = JSON.parse(JSON.stringify(this.folderarr))
    var files = JSON.parse(JSON.stringify(this.filearr))
    var selecteddata = {
      folders: folders,
      files: files
    }
    if (folders.length || files.length) {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'deleteMultiFilesandFolders',content :"You want to delete selected Items permanently." }, width: '500px', panelClass: "deletemod",disableClose:true });
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
        if (res) {
          files.forEach(element => {
            var index = this.fileElements.findIndex(x => x._id == element._id);
            this.fileElements.splice(index, 1);
          });
          folders.forEach(element => {
            var index = this.folderElements.findIndex(x => x._id == element._id);
            this.folderElements.splice(index, 1);
          });
        }
        if (res) this.documentservice.multiselect_Permenant_Delete(selecteddata).subscribe(data => {
           this.documentservice.openSnackBar("Items deleted Successfully!", "X");
          // this.fileAdded.emit()
        })
      
      })
    }
    // documentservice.multiselect_Permenant_Delete(selecteddata).subscribe(data=>{
    // console.log(data)

    // })
  }

}