import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Data, GetDataResponse, RequestDataForm } from "../model/log.model";
import { RestService } from "../rest.service";
import { DataTableDialog } from "./data-table-dialog.component";

@Component({
    selector: 'request-form-dialog',
    templateUrl: 'request-form-dialog.component.html',
})
export class RequestFormDialog {
    requestDataForm: RequestDataForm = new RequestDataForm();
    getDataResponse: GetDataResponse;

    constructor(public dialogRef: MatDialogRef<RequestFormDialog>,
        public rest: RestService,
        private dialog: MatDialog) { }

    openDataTableDialog(dialogTitle: string, phrase: string, data: Data[]) {
        const dialogRef = this.dialog.open(DataTableDialog, {
            width: '800px',
            height: '530px',
            data: {
                dataTable: data,
                dialogTitle: dialogTitle,
                phrase: phrase
            }
        });
    }

    loadData() {
        this.rest.loadData(this.requestDataForm).subscribe((data) => {
            this.getDataResponse = data.body;
            this.close();
            this.openDataTableDialog("Data Table", this.getDataResponse.phrase, this.getDataResponse.data);
        }, (err) => {
            console.log(err.error)
        });
    }

    close(): void {
        this.dialogRef.close(true);
    }
}