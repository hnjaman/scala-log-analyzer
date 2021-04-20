import { Component, OnInit } from "@angular/core";
import { FileSize, FileStatus } from '../model/log.model';
import { MatDialog } from '@angular/material';
import { RestService } from '../rest.service';
import { RequestFormDialog } from "./request-form-dialog.component";
import { HistogramDialog } from "./histogram-dialog.component";
import { CommonDialog } from "./common-dialog.component";

@Component({
  selector: "log",
  templateUrl: "log.component.html",
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  fileSize: FileSize;
  fileStatus: FileStatus;

  constructor(public rest: RestService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openRequestFormDialog(type: string) {
    if (type === 'data') {
      const dialogRef = this.dialog.open(RequestFormDialog, {
        width: '300px',
        height: '350px'
      });
    } else if (type === 'histogram') {
      const dialogRef = this.dialog.open(HistogramDialog, {
        width: '300px',
        height: '350px'
      });
    }
  }

  openCommonDialog(dialogTitle: string, dataToShow: string) {
    const dialogRef = this.dialog.open(CommonDialog, {
      width: '230px',
      height: '230px',
      data: {
        dialogTitle: dialogTitle,
        dataToShow: dataToShow
      }
    });
  }

  getFileSize() {
    this.rest.getFileSize().subscribe((data) => {
      this.fileSize = data.body;
      this.openCommonDialog("File Size", this.fileSize.size.toString())
    }, (err) => {
      console.log(err.error);
    });
  }

  getFileStatus() {
    this.rest.getFileStatus().subscribe((data) => {
      this.fileStatus = data.body;
      this.openCommonDialog("File Status", this.fileStatus.status)
    }, (err) => {
      console.log(err.error);
    });
  }
}
