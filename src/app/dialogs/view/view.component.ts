import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Pet } from 'src/app/models/pet.model';
import { PetState } from 'src/app/ngxs/state/state';
import { Observable } from 'rxjs';
import { DeletePet } from 'src/app/ngxs/actions/actions';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  profile: any = {}
  // constructor(private store: Store, private router: Router) {
    
  // }

  public num = 0
  constructor(
    public dialogRef: MatDialogRef<ViewComponent>, 
    private store: Store,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

      this.store.select(PetState.getProfile).subscribe((res:any) => {
        this.profile = res
        console.log(res)
      });
      
    }

  ngOnInit(): void {
    console.log(this.data)
  }

  close_modal(){
    this.dialogRef.close({type:"close",id:undefined});
  }
  edit_pet(id:number){
    this.dialogRef.close({type:"edit",id:id});
    this.router.navigate([`/edit/${id}`]);
  }
  delete_pet(id:string){
    this.dialogRef.close({type:"delete",id:id});
  }
}
