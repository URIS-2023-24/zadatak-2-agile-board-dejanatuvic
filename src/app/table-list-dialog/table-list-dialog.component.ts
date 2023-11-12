import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskDialogData } from 'app/models/taks-dialog-data';

@Component({
  selector: 'app-table-list-dialog',
  templateUrl: './table-list-dialog.component.html',
  styleUrls: ['./table-list-dialog.component.scss']
})
export class TableListDialogComponent implements OnInit {
  dialogData : TaskDialogData;

  constructor( private dialogRef: MatDialogRef<TableListDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: TaskDialogData) { }

  ngOnInit(): void {
  }

  onClick() : void{
    this.dialogRef.close();
  }
}
