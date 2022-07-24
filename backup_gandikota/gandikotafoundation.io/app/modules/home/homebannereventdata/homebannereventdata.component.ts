import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthardservicesService } from '../../../core/services/authardservices.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-homebannereventdata',
  templateUrl: './homebannereventdata.component.html',
  styleUrls: ['./homebannereventdata.component.css']
})


export class HomebannereventdataComponent implements OnInit {
  bannereventForm:FormGroup;
  id:any;
  constructor(private router:Router, private route:ActivatedRoute,private formBuilder: FormBuilder,private bannerservice:AuthardservicesService,private toastr: ToastrManager) { }
  Complete: boolean = false;
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.bannereventForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      eventDate:['',[Validators.required]],
      image:['',[Validators.required]],
      is_popular:['',[Validators.required]]
    });
    if(this.id){
      this.bannerservice.homeeventupdate(this.id).subscribe((response:any)=>{
        if(response.status){
          console.log(response);
          const homeevent = response.data;
          this.bannereventForm.patchValue({
            title:homeevent.title,
            location:homeevent.location,
            description:homeevent.description,
            eventDate:homeevent.eventDate,
            image:homeevent.image,
            is_popular:homeevent.is_popular
          })
        }
      })
    }
  }
  bannereventsubmit(){
    if(this.bannereventForm.valid){
      this.bannerservice.homeventcontent(this.bannereventForm.value).subscribe((response:any)=>{
        console.log(response);
        // this.router.navigate(['/dashboard/home/homebannerevent'])
        this.router.navigate(['dashboard/home/homebannerevent'])
        this.toastr.successToastr(response.message);
      },error =>{
        console.log(error);
      })
    }
  }
  fileSelected(file) {
    console.log(file)
    var reader = new FileReader();

    reader.onload = (e) => {
      console.log("e.target.result ==>",reader.result);
      this.bannereventForm.patchValue({
        image :reader.result
      })
      // this.imageBackground = reader.result;

    }
    reader.readAsDataURL(file[0]);
  }
  changeEvent(event){
    // Return date object
    this.bannereventForm.patchValue({
      eventDate : event.value
    })
  }
  chanageValue(completed:boolean){
    this.bannereventForm.patchValue({
      complete:completed
    })
  }
}
