import { Component, OnInit, Input, Inject, SimpleChanges, ViewChild, Output, EventEmitter, } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { AdminService } from '../admin.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs'
// import { esLocale } from 'ngx-bootstrap/chronos/i18n/es';

@Component({
  selector: 'app-moveto',
  templateUrl: './moveto.component.html',
  styleUrls: ['./moveto.component.css']
})
export class MovetoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MovetoComponent>, @Inject(MAT_DIALOG_DATA) public dailogData, public dialog: MatDialog, public documentService: DocumentService, private adminService: AdminService, private router: Router, private route: ActivatedRoute) {
    if(this.dailogData.multi==false){
      this.createFolder=true;
    }
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TreeNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.dailogData.Allfolder
  }
  @Output() folderAdded = new EventEmitter<{ name: string }>();

  createFolder:Boolean=false;
  profiledata: any
  role: any
  btn2: any
  foldersdata: any
  parent: any;
  selectednode: any;
  selectedElement: any;
  folders
  FileSubject: BehaviorSubject<[]>;
  SameFolder:Boolean=false;
show1:boolean=false
allFoldersList;
CreateRef;
select
  ngOnInit() {
    this.documentService.getfolder().subscribe(data => {
      this.folders = data;
      this.allFoldersList = this.queryInFolder();
      this.allFoldersList.subscribe((data) => {
        if (data) this.dataSource.data = data;
      });
      
      // if(allFoldersList) this.dataSource.data = allFoldersList;
    })

    // this.documentService.getallfolders().subscribe(data => {
    //   this.parent = data
    //   this.parent.forEach(element => {
    //     this.getChildrens(element);
    //     if((this.parent.length-1) == this.parent.indexOf(element)){
    //       console.log("last record",this.parent.length,this.parent.indexOf(element));
    //       console.log(this.parent);
    //       console.log(this.dailogData.Allfolder);
    //         this.dataSource.data = this.parent;
    //     }
    //   })
    // })
  }

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<TreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, TreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, TreeNode>;

  transformer(node: FileNode, level: number) {
    var expand
    if (node.children && node.children.length > 0) expand = true;
    else { expand = false }
    return {
      name: node.name,
      type: node.type,
      _id: node._id,
      level: level,
      children :node.children,
      expandable: expand
    };
  }

  /** Get the level of the node */
  getLevel(node: TreeNode) {
    return node.level;
  }

  /** Return whether the node is expanded or not. */
  isExpandable(node: TreeNode) {
    return node.expandable;
  };

  /** Get the children for the node. */
  getChildren(node: FileNode) {
    return observableOf(node.children);
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: TreeNode) {
    return node.expandable;
  }

  elementChecked: any;
  selected(node) {
    if(node.isExpandable) this.treeControl.isExpanded(node)
    this.select=false
    this.selectednode = node._id;
    if(node!='root'){
      this.CreateRef=node;
    }
    this.selectedElement = node
    this.elementChecked = node;
    this.show1=true
    // console.log(this.dailogData.move.folderid)
    // console.log(node._id)
    // if(this.dailogData.move.folderid){
    //   if(this.dailogData.move.folderid==node._id){
    //     this.SameFolder=true;
    //   }
    //   else {
    //     this.SameFolder=false;
    //   }
    // }
  }
  changeState(node) {
    node.expanded=!node.expanded
    if(node.expanded)this.treeControl.expand(node)
    else this.treeControl.collapse(node)
  }

  //new Folder
  AddFolder(foldername) {
    let duplicatefolderName = []
    let resultFolderName
    let folders = []
    if(this.selectedElement && this.selectedElement!='root')
      folders = this.selectedElement.children
    else
    folders=this.folders.filter(folder => !folder.parentid)
    duplicatefolderName = folders.filter((folderdata: any) => folderdata.isFolder && folderdata.name == foldername && (folderdata.parentid ? folderdata.parentid == (this.selectedElement ? this.selectedElement._id : 0) : true));
    if (duplicatefolderName.length && foldername) {
      let count = 0
      do {
        count++;
        resultFolderName = foldername + ' (' + count + ')'
        let isMatch = false
        for (let i = 0; i < folders.length; i++) {
          if (folders[i].name == resultFolderName && ((folders[i].parentid != undefined) ? folders[i].parentid == (this.selectedElement ? this.selectedElement._id : 0) : true)) {
            isMatch = true;
            break;
          }
        }
        if (!isMatch)
          break;
      } while (folders.length >= count)
    }
    if (duplicatefolderName.length > 0 && resultFolderName) foldername = resultFolderName
    var data = { name: foldername, parentid: this.selectedElement ? this.selectedElement._id : 0 }
    duplicatefolderName = []
    this.documentService.createfolder(data).subscribe(data => {
      // this.allFoldersList = this.queryInFolder();
      // this.allFoldersList.subscribe((data) => {
      //   if (data) this.dataSource.data = data;
      // });
      this.ngOnInit()
      this.documentService.openSnackBar("Folder created successfully", "X")
    })
  }

  findObjectById(root, id) {
    if (root.children) {
      for (var k in root.children) {
        if (root.children[k]._id == id) {
          return root.children[k];
        }
        else if (root.children.length) {
          this.findObjectById(root.children[k], id);
        }
      }
    }
  };

  openNewFolderDialog() {
    // const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'create' }, width: '500px', height: '200px', panelClass: "withoutpadding" });
    dialogRef.afterClosed().subscribe(res => {
      this.btn2 = false
      if (res) {
        this.AddFolder(res);
        this.folderAdded.emit({ name: res });
      }
    });
  }

  close() {
    this.dialogRef.close("CloseButton");
  }


  Move() {
    if (!this.dailogData.multi) {
      if(this.selectedElement){
        if(this.dailogData.move.isFile){
          if (this.selectedElement._id === this.dailogData.move.folderid) {this.documentService.openSnackBar("Already in same folder ", "X");}
          else{ this.dialogRef.close(this.selectedElement);}
        }
        if(this.dailogData.move.isFolder){
          if (this.selectedElement._id === this.dailogData.move.parentid) {this.documentService.openSnackBar("Already in same folder ", "X");}
          else{ this.dialogRef.close(this.selectedElement);}
        }
        if(this.selectedElement == 'root'){
          if(this.selectedElement.isFile){
          if (!this.dailogData.move.folderid && this.selectedElement == 'root') {this.documentService.openSnackBar("Already in same folder ", "X");}
          else {this.dialogRef.close(this.selectedElement);}
          }
          if(this.selectedElement.isFolder){
          if (!this.dailogData.move.parentid && this.selectedElement == 'root') {this.documentService.openSnackBar("Already in same folder ", "X");}
          else {this.dialogRef.close(this.selectedElement);}
          }
      }
      }else{
        this.documentService.openSnackBar("Please Select Destination/Create Folder", "X");
      }
    }
    // for multi select
    else {
      if (this.dailogData.folders.length > 0) {
        if (this.selectedElement){
          if (this.selectedElement._id === this.dailogData.folders[0].parentid) {this.documentService.openSnackBar("Already in same folder ", "X");}
          else{ this.dialogRef.close(this.selectedElement);}
        }
        else {
          this.documentService.openSnackBar("Please Select Destination/Create Folder", "X");
        }
        if( this.selectedElement == 'root'){
          if (!this.dailogData.folders[0].parentid && this.selectedElement == 'root') {this.documentService.openSnackBar("Already in same folder ", "X");}
          else {this.dialogRef.close(this.selectedElement);}
        }
      }
      if (this.dailogData.documents.length > 0) {
        if (this.selectedElement){
          if (this.selectedElement._id === this.dailogData.documents[0].folderid) {
            this.documentService.openSnackBar("Already in same folder ", "X");
          } else {
            this.dialogRef.close(this.selectedElement);
          }
        }
        else {
          this.documentService.openSnackBar("Please Select Destination/Create Folder", "X");
        }
        if( this.selectedElement == 'root'){
          if (!this.dailogData.documents[0].folderid && this.selectedElement == 'root') this.documentService.openSnackBar("Already in same folder ", "X");
          else this.dialogRef.close(this.selectedElement);
        }
          
      }
    }

  }
    
  
 
  // getChildrens(element) {
  //   this.documentService.getfolderdetails(element._id).subscribe(data => {
  //     element.type = 'folder'
  //     element.children = data;
  //     if (element.children.length > 0) {
  //       element.children.forEach(element => {
  //         element.type = 'folder'
  //         element.children = this.getChildrens(element)
  //       });
  //     }
  //   })
  //   return element
  // }

  queryInFolder = function () {
    const result = [];
     if(this.dailogData.folders==undefined|| !this.dailogData.folders.length){  
        this.folders.forEach(element => {
      if (!element.parentid) {
        result.push(element);
      }
      else if (element.parentid) {
        this.folders.forEach(element1 => {
          if (!element1.children) element1.children = []
          if (element.parentid == element1._id) element1.children.push(element);
        });
      }
      // if ((this.folders.length - 1) == this.folders.indexOf(element)) return result;
    });}
    else if(this.dailogData.folders.length){
      this.folders.forEach(element => {
        var selected_folder=this.dailogData.folders.some(x=>x._id==element._id)
        if (!element.parentid && !selected_folder) {
          result.push(element);
        }
        else if (element.parentid) {
          this.folders.forEach(element1 => {
            var selected_folder=this.dailogData.folders.some(x=>x._id==element._id)
            if (!element1.children) element1.children = []
            if (element.parentid == element1._id && !selected_folder) element1.children.push(element);
          });
        }
        // if ((this.folders.length - 1) == this.folders.indexOf(element)) return result;
      });
    }
    if (!this.FileSubject) { this.FileSubject = new BehaviorSubject(result); }
    else { this.FileSubject.next(result); }
    return this.FileSubject.asObservable();
  }



}

/** File node data with nested structure. */
export interface FileNode {
  name: string;
  type: string;
  _id: string
  children?: FileNode[];
}

/** Flat node with expandable and level information */
export interface TreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}
