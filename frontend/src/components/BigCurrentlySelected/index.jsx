import { useEffect, useState } from 'react';

import './style.scss';

const BigCurrentlySelected = (props) => {
  const [color, setColor] = useState('rgba(39, 174, 96, 1)');

  useEffect(() => {
    if (props.currentPlot && props.currentPlot.type === 'crop') { 
      if (props.currentPlot.state === 'Spring' || props.currentPlot.state === 'Summer') {
        setColor('rgba(39, 174, 96, 1)');
      } else {
        setColor('rgba(237, 193, 81, 1)');
      }
    }
    else {
      setColor('rgba(64, 145, 220, 1)');
    }
  }, [props.currentPlot])

  return (
    <div
      className="big-currently-selected right-into"
      style={{
        backgroundImage: `linear-gradient(to top, ${color} 70%, rgba(178, 178, 178, 0)), url(${props.currentPlot.image || 'https://i.imgur.com/qqWYtUu.png'})`,
        boxShadow: `0px 0px 15px ${color}`
      }}
    >
      <div 
        className="information"
        style={{
          backgroundColor: color
        }}
      >
        <h1>Current Selection</h1>
        <h2 style={{marginBottom: '4vh'}}>{props.currentPlot.name || 'N/A'}</h2>
        <div className="section summary">
          <h3>What is it</h3>
          <p>{props.currentPlot.summary || 'N/A'}</p>
        </div>
        <div className="section cost">
          <h3>Cost</h3>
          <p>{props.currentPlot.cost || 'N/A'}</p>
        </div>
        <div className="section state">
          <h3>Maintenance</h3>
          <p>{props.currentPlot.state || 'N/A'}</p>
        </div>
        <div className="section impact">
          <h3>Environmental Impact</h3>
          <p>{props.currentPlot.environmentalImpact || 'N/A'}</p>
        </div>
        <div className="section verdict">
          <h3>Verdict</h3>
          <p>{props.currentPlot.verdict || 'N/A'}</p>
        </div>
      </div>
    </div>
  )  
}

export default BigCurrentlySelected;