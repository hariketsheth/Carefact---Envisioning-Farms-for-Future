import { useEffect, useState } from 'react';

import './style.scss';

const Breakdowns = (props) => {
    const [color1, setColor1] = useState('#7DBDF9');
    const [color2, setColor2] = useState('#4091DC');
    useEffect(() => {
      if (props.grade === 'A' || props.grade === 'B') {
        setColor1('#E9FF60');
        setColor2('#04D600');
      } else if (props.grade === 'C') {
        setColor1('#E9FF60');
        setColor2('#EF8B2E');
      } else if (props.grade === 'D' || props.grade === 'F') {
        setColor1('#DC4040');
        setColor2('#E3B744');
      }
    }, [props.grade])

  return (
    <div class="Breakdowns-Stats">
      <h3 className="stat-title">{props.title}</h3>
      <p className="sub-title">
        Grade calculated by realtime data on your location.
      </p>
      <div className="row">
        <div className="grade">
          <h1
            className="gradient"
            style={{
              backgroundImage: `linear-gradient(to bottom,${color1}, ${color2})`,
            }}
          >
            {props.grade}
          </h1>
          <p className="criteria">
            {props.criteria}
       
          </p>
        </div>
        <div className="explanation">{props.explanation}</div>
      </div>
    </div>
  );
};

export default Breakdowns;
