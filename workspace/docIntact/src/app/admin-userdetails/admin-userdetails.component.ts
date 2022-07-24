import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { AdminService } from '../admin.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

@Component({
  selector: 'app-admin-userdetails',
  templateUrl: './admin-userdetails.component.html',
  styleUrls: ['./admin-userdetails.component.css']
})
export class AdminUserdetailsComponent implements OnInit {
userid
parent
treeControl = new NestedTreeControl<FoodNode>(node => node.children);
dataSource = new MatTreeNestedDataSource<FoodNode>();
  constructor(public activatedroute: ActivatedRoute,private router: Router,public adminservice:AdminService) { 

  }

  ngOnInit() {

    this.userid=this.activatedroute.snapshot.paramMap.get("user");
 this.adminservice.user_folders_files(this.userid).subscribe(data=>{
   this.parent=data
   this.parent.forEach(element => {
    // element.children=this.getChildrens(element)
    if(element.isFolder)this.getChildrens(element);
    // if(this.parent.indexOf(element)== (this.parent.length)-1)     this.dataSource.data=this.parent

  });
  setTimeout(() =>{
    this.dataSource.data = this.parent;
  },5000);
 })
  }


  getChildrens(element) {
    this.adminservice.getadminfolderdetails(element._id).subscribe(data => {
      element.type = 'folder'
      element.children = data;
      if (element.children.length > 0) {
        element.children.forEach(element => {
          element.type = 'folder'
          if(element.isFolder) element.children = this.getChildrens(element)
        });
      }
    })

    return element
  }
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

}
interface FoodNode {
  name: string;
  isFolder:boolean
  isFile:boolean
  children?: FoodNode[];
}


const TREE_DATA = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];