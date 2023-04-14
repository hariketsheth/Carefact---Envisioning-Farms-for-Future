import { useEffect, useState } from 'react';

import './style.scss';

import crop from 'assets/crop.svg';
import irrigation from 'assets/irrigation.svg';

const Plot = (props) => {
  const [borderColor, setBorderColor] = useState('#13D181');
  const [color, setColor] = useState('rgba(39, 174, 96, 1)');

  useEffect(() => {
    if (props.type === 'crop') { 
      if (props.state === 'Spring' || props.state === 'Summer') {
        setColor('rgba(39, 174, 96, 1)');
        setBorderColor('#13D181');
      } else {
        setColor('rgba(237, 193, 81, 1)');
        setBorderColor('#EDC151');
      }
    }
    else {
      setColor('rgba(64, 145, 220, 1)');
      setBorderColor('#4091DC');
    }
  }, [props.type, props.state])

  return (
    <div
      className="plot"
      onClick={props.onClick}
      style={{
        backgroundImage: `linear-gradient(to right, ${color} 65%, rgba(178, 178, 178, 0)), url(${props.image})`,
        border: `1px solid ${borderColor}`,
        boxShadow: `0px 0px 15px ${borderColor}`
      }}
    >
      <img src={(props.type === 'crop') ? crop : irrigation} />
      <div className="section">
        <h2>{(props.type === 'crop') ? 'Crop' : 'Irrigation'}</h2>
        <h1>{props.name}</h1>
      </div>
      <div className="section">
        <div className="section">
          <h2>Earth Score</h2>
          <h1>{props.earthScore}/100</h1>
        </div>
      </div>
      <div className="section">
        <h2>{(props.type === 'crop') ? 'Season' : 'Maintenance'}</h2>
        <h1>{props.state}</h1>
      </div>
    </div>
  )
}

export default Plot;