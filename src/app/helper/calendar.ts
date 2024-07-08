import { NCalendario } from "../model/calendario.model";

export function findEvent(newCalendarData: NCalendario.Body[], item: NCalendario.IEvent): NCalendario.FindEvent{
    return newCalendarData.flatMap((calendar, calendarIndex) => {
        const eventIndex = calendar.events.findIndex(event => event.id === item.id);
        return eventIndex !== -1 ? {eventIndex, calendarIndex, isSameDate : formatDate(calendar.date) === formatDate(item.date)} : null;
      }).find(item => item);
}

export function formatDate(date: Date){
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
  }

export function  createEvent(newCalendarData: NCalendario.Body[], item: NCalendario.IEvent){
    const selectIndex = newCalendarData.findIndex(calendar => formatDate(calendar.date) === formatDate(item.date));
    if (selectIndex !== -1){
      newCalendarData[selectIndex].events.push(item);
    }
}

export function updateEvent(newCalendarData: NCalendario.Body[], item: NCalendario.IEvent, findEvent: NCalendario.FoundEvent){
    if(findEvent.isSameDate){
        newCalendarData[findEvent.calendarIndex].events[findEvent.eventIndex] = item;
      }else{
        newCalendarData[findEvent.calendarIndex].events.splice(findEvent.eventIndex);
        createEvent(newCalendarData, item); 
      }
}

export function TemplateCalendarData(day: number, date: Date){
    return {
        day,
        date,
        isCurrentDay: false,
        isCurrentMonth: false,
        events: [],
      }
}