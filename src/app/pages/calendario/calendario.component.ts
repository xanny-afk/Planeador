import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { getSelectDate, NCalendario } from '../../model/calendario.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';
import { MatMenuModule } from '@angular/material/menu';
import { createEvent, findEvent, formatDate, updateEvent, TemplateCalendarData } from '../../helper/calendar';



@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {
  private totalItems = 42;

  private date = new Date();

  private findEvent = findEvent;

  headers: NCalendario.Header = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  calendarData : NCalendario.Body [] = [];

  constructor(    
    private readonly dialogService: DialogService
  ){
    this.createCalendario();
    effect(()=> {
      if (this.dialogService.getEvent){
        this.createEvent(this.dialogService.getEvent);
      }
    });
  }

  private createEvent(item:NCalendario.IEvent){
    const newCalendarData = [...this.calendarData];

    const findEvent = this.findEvent(newCalendarData, item);

    if(!findEvent){
      createEvent(newCalendarData, item);
    }else{
      updateEvent(newCalendarData, item, findEvent);
    }
    this.calendarData = newCalendarData;
  }

  createCalendario() {

    const firstDaysInMonth = getSelectDate(this.date, 1).getDay();
    const previuosDaysInMonth = getSelectDate(this.date).getDate();
    for(let index =  firstDaysInMonth; index > 0; index--){
      this.calendarData.push(TemplateCalendarData(previuosDaysInMonth - (index -1), getSelectDate(this.date, previuosDaysInMonth - (index -1), -1)));
    }

    const daysInMonth = getSelectDate(this.date, 0, 1).getDate();
    for(let index = 1; index <= daysInMonth; index++){
      const newDate = getSelectDate(this.date, index);
      console.log(newDate)
      this.calendarData.push(
        {
          ...TemplateCalendarData(index,newDate),
          isCurrentDay: formatDate(this.date) === formatDate(newDate),
          isCurrentMonth: true,
        }
      );
    }

    const calendarLength = this.calendarData.length;

    for(let index = 1; index <= (this.totalItems - calendarLength); index++){
      this.calendarData.push(TemplateCalendarData(index,getSelectDate(this.date, index, 1)));
    }
  }

  openModal(){
     this.dialogService.openDialog();
  }

  removeEvent(calendarIndex: number, eventIndex: number){
    const newCalendarData = [...this.calendarData];
    newCalendarData[calendarIndex].events.splice(eventIndex,1);
    this.calendarData = newCalendarData;
  }

  openModalEdit( event: NCalendario.IEvent){
    this.dialogService.openDialog(event);
 }
}
