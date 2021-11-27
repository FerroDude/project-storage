import Calendar from 'react-calendar';
import './style.scss';

const ReactCalendar = (props) => {
  return (
    <div>
      <Calendar
        selectRange={true}
        onChange={props.onChange}
        value={props.date}
        minDate={new Date()}
      />
    </div>
  );
};

export default ReactCalendar;
