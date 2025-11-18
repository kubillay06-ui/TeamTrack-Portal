/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import "../profileCalendar.scss";

dayjs.extend(utc);

type CalendarContainerProps = {
  schedule: any;
  auth: any;
};

// STAFF COLOR EKLEDİM
const STAFF_COLORS = [
  "#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FF33A8", "#33FFF2",
];

const CalendarContainer = ({ schedule, auth }: CalendarContainerProps) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [openPopup, setOpenPopup] = useState(false);

  const initialDate = dayjs(schedule?.scheduleStartDate).toDate();

  const generateAllEvents = () => {
    const allEvents: any[] = [];

    schedule?.assignments?.forEach((assign: any, idx: number) => {
      const staff = schedule.staffs.find((s: any) => s.id === assign.staffId);
      const shift = schedule.shifts.find((sh: any) => sh.id === assign.shiftId);
      const date = dayjs.utc(assign.shiftStart).format("YYYY-MM-DD");

      allEvents.push({
        id: assign.id,
        title: `${staff?.name} - ${shift?.name}`,
        start: date,
        backgroundColor: STAFF_COLORS[idx % STAFF_COLORS.length],
        borderColor: STAFF_COLORS[idx % STAFF_COLORS.length],
        textColor: "#fff",
        extendedProps: {
          staffName: staff?.name,
          shiftName: shift?.name,
          start: assign.shiftStart,
          end: assign.shiftEnd,
        },
      });
    });

    setEvents(allEvents);
  };

  useEffect(() => {
    generateAllEvents();
  }, [schedule]);

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event.extendedProps);
    setOpenPopup(true);
  };

  return (
    <div className="calendar-section">
      <FullCalendar
        ref={calendarRef}
        locale={auth.language}
        plugins={[dayGridPlugin, interactionPlugin]}
        contentHeight={500}
        initialView="dayGridMonth"
        initialDate={initialDate}
        events={events}
        editable={true}
        selectable={true}
        eventClick={handleEventClick}
        dayMaxEventRows={3}
      />

      {/* POPUP Personel  */}
      {openPopup && selectedEvent && (
        <div className="calendar-popup">
          <div className="popup-content">
            <h2>Etkinlik Detayı</h2>
            <p><strong>Personel:</strong> {selectedEvent.staffName}</p>
            <p><strong>Vardiya:</strong> {selectedEvent.shiftName}</p>
            <p><strong>Başlangıç:</strong> {dayjs(selectedEvent.start).format("DD.MM.YYYY HH:mm")}</p>
            <p><strong>Bitiş:</strong> {dayjs(selectedEvent.end).format("DD.MM.YYYY HH:mm")}</p>
            <button onClick={() => setOpenPopup(false)} className="close-btn">
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarContainer;
