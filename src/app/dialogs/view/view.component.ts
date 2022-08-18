import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { PetState } from 'src/app/ngxs/state/state';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  profile: object = {}

  public num = 0
  constructor(
    public dialogRef: MatDialogRef<ViewComponent>, 
    private store: Store,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

      this.store.select(PetState.getProfile).subscribe((res:any) => {
        this.profile = res
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
