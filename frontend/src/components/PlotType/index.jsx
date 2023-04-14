import { useState } from 'react';
import { Select } from 'antd';

import './style.scss';

import search from 'assets/search.svg';
import sprout from 'assets/sprout.svg';

import Plot from 'components/Plot';

const { Option } = Select;

const PlotType = (props) => {
  const [filter, setFilter] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (value) => {
    setFilter(value);
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="plot-type right-into">
      <div className="heading">
        <img src={sprout} alt="sprout icon"/>
        <div className="text">
          <h1>Select Plot Type</h1>
          <h2>Includes crops, buildings, and irrigation</h2>
        </div>
      </div>
      <div className="search-bar">
        <img src={search} alt="search icon"/>
        <input placeholder="Search or create plot type" onChange={handleSearch}/>
      </div>
      <div className="filter">
        <h3>Recommended by AI</h3>
        <div className="select">
          <Select defaultValue="all" onChange={handleChange} style={{ width: 100 }}>
            <Option value="all">All</Option>
            <Option value="crops">Crop</Option>
            <Option value="irrigation">Irrigation</Option>
          </Select>
        </div>
      </div>
      <div className="plots">
        {props.plots.map((plot) => {
          if (
            (plot.name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
            plot.type.toLowerCase().startsWith(searchValue.toLowerCase()) ||
            plot.state.toLowerCase().startsWith(searchValue.toLowerCase())) &&
            (filter === 'all' ||
            (filter === 'crops' && plot.type === 'crop') ||
            (filter === 'irrigation' && plot.type==='irrigation'))
          ) {
            return (
              <Plot
                earthScore={plot.earthScore}
                name={plot.name}
                image={plot.image}
                state={plot.state}
                type={plot.type}
                onClick={() => {
                  props.setCurrentPlot(plot);
                  if (props.draw) {
                    props.draw.draw.changeMode('draw_rectangle');
                  }
                }}
              />
            )
          }
        })}
      </div>
    </div>
  );
}

export default PlotType;