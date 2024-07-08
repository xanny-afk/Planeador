
import { Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { NCalendario } from '../model/calendario.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogData = signal<NCalendario.IEvent | null>(null);

  constructor(public dialog: MatDialog) {}

  openDialog(data?: NCalendario.IEvent): void {
    this.dialog.open(DialogComponent, {
      data,
      width: '70vw'
    });
  }

  setEvent(item: NCalendario.IEvent) {
    this.dialogData.set(item);
  }

  get getEvent() {
    return this.dialogData();
  }

}