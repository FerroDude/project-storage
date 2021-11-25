import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ReactCalendar = () => {
  const [date, setDate] = useState(new Date());
  const onChange = (date) => setDate(date);
  return (
    <div>
      <Calendar selectRange={true} onChange={onChange} value={date} />
      {console.log(date)}
    </div>
  );
};

export default ReactCalendar;
