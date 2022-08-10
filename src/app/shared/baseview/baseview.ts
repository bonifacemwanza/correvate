import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";

@Component({
    selector: "app-baseview",

    template: ``,

    styleUrls: ["./baseview.component.css"],
})
export class BaseviewComponent implements OnDestroy {
    protected subs: Subscription[] = [];

    public isRefreshingData = false;

    constructor() { }

    ngOnDestroy(): void {
        this.subs.forEach((sub: Subscription) => {
            sub.unsubscribe();
        });
    }
}
