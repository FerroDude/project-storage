import Calendar from 'react-calendar';
import './style.scss';

const ReactCalendar = (props) => {
  const tileDisabled = (date, view) => {
    if (view === 'month') {
      return date < new Date();
    }
  };
  return (
    <div>
      <Calendar
        selectRange={true}
        onChange={props.onChange}
        value={props.date}
        tileDisabled={tileDisabled}
      />
    </div>
  );
};

export default ReactCalendar;
