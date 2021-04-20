import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Data } from "../model/log.model";
import { RestService } from "../rest.service";

@Component({
    selector: 'data-table-dialog',
    templateUrl: 'data-table-dialog.component.html',
    styleUrls: ['./data-table-dialog.component.css']
})
export class DataTableDialog {
    dialogTitle: string;
    phrase: string;
    dataTable: Data[];

    constructor(public dialogRef: MatDialogRef<DataTableDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public rest: RestService) { }

    ngOnInit() {
        this.dialogTitle = this.data.dialogTitle;
        this.dataTable = this.data.dataTable;
        this.phrase = this.data.phrase;
        this.highlight(this.dataTable);
    }

    close(): void {
        this.dialogRef.close(true);
    }

    highlight(datas: Data[]) {
        for (let data of datas) {
            data.message = data.message.replace(new RegExp(this.phrase, 'gi'), match => {
                return '<b><mark>' + match + '</mark></b>';
            });
        }
    }
}