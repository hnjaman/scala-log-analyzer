import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LogModule } from './log/log.module';
import { LogComponent } from './log/log.component';
import { RouterModule } from '@angular/router';

import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatFormFieldModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestFormDialog } from './log/request-form-dialog.component';
import { DataTableDialog } from './log/data-table-dialog.component';
import { HistogramDialog } from './log/histogram-dialog.component';
import { HistogramChartDialog } from './log/histogram-chart-dialog.component';
import { CommonDialog } from './log/common-dialog.component';
import { GoogleChartsModule } from 'angular-google-charts';

/**
 * NgModule that includes all Material modules that are required to serve 
 * the Plunker.
 */
@NgModule({
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,

    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
  ],
  imports: [BrowserAnimationsModule]
})
export class MaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    RequestFormDialog,
    DataTableDialog,
    HistogramDialog,
    HistogramChartDialog,
    CommonDialog
  ],
  entryComponents: [
    RequestFormDialog,
    DataTableDialog,
    HistogramDialog,
    HistogramChartDialog,
    CommonDialog
  ],
  imports: [
    BrowserModule,
    LogModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: "", component: LogComponent }
    ], { relativeLinkResolution: 'legacy' }),
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
