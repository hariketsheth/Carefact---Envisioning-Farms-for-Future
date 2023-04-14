import './style.scss';

const CurrentlySelected = (props) => {
  return (
    <div className="currently-selected">
      <div className="text">
        <h2>Selected</h2>
        <h1>
          { ! props.currentPlot.name ? 'N/A' : 
            props.currentPlot.name.length > 6 ? props.currentPlot.name.substring(0, 5) + '...' : 
            props.currentPlot.name
          }
        </h1>
      </div>
      <div className="text">
        <h2>Size</h2>
        <h1>{props.currentPlot.sqFt ? Math.floor(props.currentPlot.sqFt / 1000) + 'k sqft': 'N/A' }</h1>
      </div>
    </div>
  )
}

export default CurrentlySelected;