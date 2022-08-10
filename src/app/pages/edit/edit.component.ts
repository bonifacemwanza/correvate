import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { Pet } from "src/app/models/pet.model";
import { PetState } from "src/app/ngxs/state/state";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { EditService } from "./edit.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  public pet_id: string | null = "";
  public pet_data:any = {
    "id": 0,
    "category": {
      "id": 0,
      "name": "string"
    },
    "name": "",
    "photoUrls": [],
    "tags": [],
    "status": "available"
  }

  public name:string = ''
  public status:string= 'available'
  public images:any = []

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private editService: EditService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pet_id = params.get("id");
    });

    this.store
      .select(PetState.getPets)
      .pipe()
      .subscribe((res) => {
        this.renderStore(res)
      });
  }
  renderStore(data:any){
    if(data.payload){
      data.payload.forEach((element: any) => {
        if (element.id == this.pet_id) {
          this.pet_data = element;
          this.name = element.name
          this.status = element.status
          element.photoUrls.forEach((element:any) => {
            this.images.push(element)
          })
        }
      });
    }else {
       this.router.navigate([`/pets`]);
    }
   
  }
  editPet(){
    let payload:Pet = {
      "id": this.pet_data.id,
      "category": this.pet_data.category,
      "name": this.name,
      "photoUrls": this.images,
      "tags": this.pet_data.tags,
      "status": this.status
    }
    this.editService.updatePet(payload).subscribe(() => {
      this.router.navigate([`/pets`]);
    })
  }

  deleteImage(i:number){
    let newImages: any = []
    this.images = this.images.forEach((element:any, index:number) => {
      if(index !== i){
        newImages.push(element)
      }
    })
    this.images = newImages
  }

  updateStatus(chageStatus:HTMLSelectElement){
    const newSection = chageStatus.value;
    this.pet_data.status = newSection
  }
  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.images.push(imgBase64Path);  
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
