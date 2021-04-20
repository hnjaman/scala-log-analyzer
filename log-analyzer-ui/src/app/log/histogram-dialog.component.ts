import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GetHistogramResponse, Histogram, RequestDataForm } from "../model/log.model";
import { RestService } from "../rest.service";
import { HistogramChartDialog } from "./histogram-chart-dialog.component";

@Component({
    selector: 'histogram-dialog',
    templateUrl: 'histogram-dialog.component.html',
})
export class HistogramDialog {
    requestDataForm: RequestDataForm = new RequestDataForm();
    getHistogramResponse: GetHistogramResponse;
    dialogTitle: string;
    phrase: string;
    histogram: Histogram[];

    constructor(public dialogRef: MatDialogRef<HistogramDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public rest: RestService,
        private dialog: MatDialog) { }

    ngOnInit() {

    }

    openHistogramDialog(dialogTitle: string, phrase: string, histogram: Histogram[]) {
        const dialogRef = this.dialog.open(HistogramChartDialog, {
            width: '500px',
            height: '350px',
            data: {
                histogram: histogram,
                dialogTitle: dialogTitle,
                phrase: phrase
            }
        });
    }

    loadData() {
        this.rest.loadHistogram(this.requestDataForm).subscribe((data) => {
            console.log(data)
            this.getHistogramResponse = data.body;
            this.close();
            this.openHistogramDialog("Histogram", this.getHistogramResponse.phrase, this.getHistogramResponse.histogram);
        }, (err) => {
            console.log(err.error)
        });
    }

    close(): void {
        this.dialogRef.close(true);
    }
}