import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'common-dialog',
  templateUrl: 'common-dialog.component.html',
})
export class CommonDialog {
  dialogTitle: string;
  dataToShow: string;

  constructor(public dialogRef: MatDialogRef<CommonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dialogTitle = this.data.dialogTitle;
    this.dataToShow = this.data.dataToShow;
  }

  close(): void {
    this.dialogRef.close(true);
  }
}