import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CreateService } from "./create.service";
import Categories from "../../../assets/Categories.json";
import { Pet } from "src/app/models/pet.model";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  public errors: string[] = [];

  constructor(
    private router: Router,
    private createService: CreateService
  ) {}

  public petData: Pet = {
    id: "",
    category: "",
    name: "",
    photoUrls: [],
    tags: [],
    status: "available",
  };

  public isImageSaved: boolean = false;
  public Categories = Categories;

  ngOnInit(): void {}

  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const imgBase64Path = e.target.result;
          this.petData.photoUrls.push(imgBase64Path);
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  savePet() {
    if(this.petData.name == "" || this.petData.category == ""){
      this.errors.push("pets and categories can not be empty")
      return
    }
    let category = undefined;
    Categories.forEach((element) => {
      if (element.id == this.petData.category) category = element;
    });
    this.petData.category = category;
    this.createService
      .createPet(this.petData)
      .pipe()
      .subscribe(() => {
        this.router.navigate([`/pets`]);
      });
      this.errors = []
  }

  deleteImage(i: number) {
    let new_images: any = [];
    this.petData.photoUrls.forEach((element: any, index: number) => {
      if (index !== i) {
        new_images.push(element);
      }
    });
    this.petData.photoUrls = new_images;
  }
}
