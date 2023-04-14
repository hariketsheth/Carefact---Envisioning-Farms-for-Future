import { Slider } from 'antd';

import './style.scss';
import timer from 'assets/timer.svg';

const marks = {
  336: {
    label: <p className="label">Spring</p>,
  },
  63: {
    label: <p className="label">Summer</p>,
  },
  157: {
    label: <p className="label">Fall</p>,
  },
  247: {
    label: <p className="label">Winter</p>,
  },
};

const Timeline = (props) => {
  const onChange = (value) => {
    props.setDay((108 + value));
    Object.values(props.objects).forEach((object) => {
      console.log(props.objects);
      console.log('testtt');
      console.log(object.day);
      const dayDiff = props.day - object.day;
      console.log(dayDiff);
      object.model.scale.y = Math.max((dayDiff * 2) + 100, -1);
      object.model.position.y = Math.max((((100 / 3.28084) / 100) * ((dayDiff * 1) + 50)), -1);
    });
  }

  return (
    <div className="timeline">
      <div className="info">
        <img src={timer} alt="timer icon"/>
        <div className="text">
          <h1>Timeline</h1>
          <h2>Over Seasons</h2>
        </div>
      </div>
      <div className="slider">
       <Slider onChange={onChange} defaultValue={0} marks={marks} tooltipVisible={false} max={365}/>
      </div>
    </div>
  )
}

export default Timeline;