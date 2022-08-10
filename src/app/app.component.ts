import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { PetState } from "src/app/ngxs/state/state";
import { AccountComponent } from "./shared/helpers/account";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  profile: any = {};

  constructor(private store: Store, public account: AccountComponent) {
    this.store.select(PetState.getProfile).subscribe((res: any) => {
      this.profile = res;
    });
  }
}
