import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
const TODAY_STR = new Date().toISOString().replace(/T.*$/, '');

let eventGuid = 0;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  calendarVisible = true;
  calendarVisible1 = false;
  calendarOptions?: CalendarOptions;
  currentEvents: EventApi[] = [];
  datosEventoUsuario = [{
    id: this.createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: this.createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00'
  },
  {
    id: this.createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  }];
  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.configurarCalendario();
  }

  configurarCalendario(){
    this.calendarOptions = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      locales: [esLocale],
      initialView: 'dayGridMonth',
      initialEvents: this.datosEventoUsuario, // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this)
    };
  }


  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  agregarDatos(){
    this.updateEvents();
    this.calendarVisible=!this.calendarVisible;
    this.calendarVisible1=!this.calendarVisible1;
  }

  agregarDatos1(){
    this.updateEvents1();
    this.calendarVisible=!this.calendarVisible;
    this.calendarVisible1=!this.calendarVisible1;
  }

  updateEvents() {
    const nowDate = new Date();
    let addDato = {
      id: this.createEventId(),
      title: "title",
      start: "2023-11-04",
      end: "2023-11-07"
    }
    this.datosEventoUsuario.push(addDato)
    console.log(this.datosEventoUsuario)
    this.calendarOptions!.initialEvents = this.datosEventoUsuario;
  }

  updateEvents1() {
    const nowDate = new Date();
    const yearMonth = nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);
    let addDato = {
      id: this.createEventId(),
      title: "title gg1",
      start: "2023-11-08",
      end: "2023-11-22"
    }
    this.datosEventoUsuario.push(addDato)
    console.log(this.datosEventoUsuario)
    this.calendarOptions!.initialEvents = this.datosEventoUsuario;
  }

  createEventId() {
    return String(eventGuid++);
  }
}