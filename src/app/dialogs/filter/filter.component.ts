import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Categories from "../../../assets/Categories.json"

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public Categories = Categories

  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  public name: string = ""
  public category: string = ""
  public status: string = ""
  ngOnInit(): void {
    this.name = this.data['name']
    this.status = this.data['status']
    this.category = this.data['category']
  }


  clear_all() {
    this.name = ""
    this.status = ""
    this.category = ""
  }

  search() {
    let payload = {
      name: this.name,
      category: this.category,
      status: this.status,
    }
    this.dialogRef.close({ type: "search", data: payload });
  }

  close() {
    this.dialogRef.close({ type: "close" });
  }
}
