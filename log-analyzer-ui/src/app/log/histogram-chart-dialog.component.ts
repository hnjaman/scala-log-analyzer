import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GetHistogramResponse, Histogram } from "../model/log.model";
import { RestService } from "../rest.service";

@Component({
    selector: 'histogram-chart-dialog',
    templateUrl: 'histogram-chart-dialog.component.html',
    styleUrls: ['./histogram-chart-dialog.component.css']
})
export class HistogramChartDialog {
    getHistogramResponse: GetHistogramResponse;
    dialogTitle: string;
    phrase: string;
    histogram: Histogram[];
    histogramData: String[][] = new Array();
    title: string;

    constructor(public dialogRef: MatDialogRef<HistogramChartDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public rest: RestService) { }

    ngOnInit() {
        this.dialogTitle = this.data.dialogTitle;
        this.phrase = this.data.phrase;
        this.histogram = this.data.histogram;
        this.title = this.phrase.toUpperCase() + ' counts on a datetime';
        this.generateHistogramData();
    }

    close(): void {
        this.dialogRef.close(true);
    }

    generateHistogramData() {
        if (this.histogram != undefined) {
            for (let histo of this.histogram) {
                this.histogramData.push([histo.datetime, histo.counts.toString()])
            }
        }
    }

    type = 'Histogram';
    columnNames = ["Datetime", "counts"];
    options = {
        legend: 'none'
    };
    width = 750;
    height = 600;
}