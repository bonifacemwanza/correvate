import { Component, OnInit } from "@angular/core";
import { ViewComponent } from "src/app/dialogs/view/view.component";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { Pet } from "src/app/models/pet.model";
import { PetState } from "src/app/ngxs/state/state";
import {
  catchError,
  forkJoin,
  map,
  of,
} from "rxjs";
import { PetsService } from "./pets.service";
import { FetchPets } from "src/app/ngxs/actions/actions";
import { FilterComponent } from "src/app/dialogs/filter/filter.component";
import { BaseviewComponent } from "src/app/shared/baseview/baseview";

@Component({
  selector: "app-pets",
  templateUrl: "./pets.component.html",
  styleUrls: ["./pets.component.scss"],
})
export class PetsComponent extends BaseviewComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private store: Store,
    private petService: PetsService
  ) {
    super();
  }
  petData: Pet[] = [];
  originalPets: Pet[] = [];

  filter_data = {
    name: "",
    category: "",
    status: "",
  };

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.fetchPets();
    this.populatefromStore();
  }

  fetchPets(): void {
    const sub$ = forkJoin([
      this.petService.getPets("available"),
      this.petService.getPets("pending"),
      this.petService.getPets("sold"),
    ])
      .pipe(
        catchError(() => {
          return of([]);
        }),
        map(([available, pending, sold]) => {
          console.log(available)
          return { allPets: sold.concat(available.concat(pending)) };
        }),
        catchError(() => {
          return of([
            { availble: undefined, pending: undefined, sold: undefined },
          ]);
        })
      )
      .subscribe((data) => {
        this.dispatchPetsToStore(data);
      });
      this.subs.push(sub$);
  }
  dispatchPetsToStore(data: any) {
    let newArray: Array<object> = [];
    if (data.allPets !== undefined) {
      for (const newObj in data.allPets) {
        newArray.push(data.allPets[newObj]);
      }
      this.store.dispatch(new FetchPets(newArray));
    }
  }
  populatefromStore() {
    this.store
      .select(PetState.getPets)
      .pipe()
      .subscribe((data: any) => {
        this.petData = data.payload;
        this.originalPets = data.payload;
      });
  }

  view(pet: Pet) {
    let dialogRef = this.dialog.open(ViewComponent, { data: pet });
    dialogRef.afterClosed().subscribe((res) => {
      const { id, type } = res;
      if (type == "delete" && res.id) {
        this.petService.deletePet(id).subscribe(() => {
          this.initializeData();
        });
      }
    });
  }

  filter() {
    let dialogRef = this.dialog.open(FilterComponent, {
      data: this.filter_data,
    });
    dialogRef.afterClosed().subscribe((res) => {
      const { data, type } = res;
      if (type == "search") {
        this.filter_data = data;
        this.applyFilter();
      }
    });
  }

  applyFilter() {
    this.petData = this.originalPets.filter((element: any) => {
      let name = element["name"].toLowerCase();
      let status = element["status"].toLowerCase();
      let category = element["category"]["name"].toLowerCase();
      let fname = this.filter_data["name"].toLowerCase();
      let fstatus = this.filter_data["status"].toLowerCase();
      let fcategory = this.filter_data["category"].toLowerCase();
      return (
        name.includes(fname) &&
        status.includes(fstatus) &&
        category.includes(fcategory)
      );
    });
  }
}
