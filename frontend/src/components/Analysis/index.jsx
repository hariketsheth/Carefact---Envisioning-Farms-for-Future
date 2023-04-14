import './style.scss';

import analysis from 'assets/analysis.svg';
import Card from './Card';
import Breakdowns from './Breakdowns';

const FireRisk = ["Low", "Medium", "High"];
const Grade = ["A", "B", "C", "D", "E", "F"];
const Exp = ["Best", "Good", "Average", "Risky", "Bad"];
const num = Grade[Math.floor(Math.random() * Grade.length)];
const Analysis = (props) => {
  return (
    <div className="analysis right-into">
      <div className="heading">
        <img src={analysis} alt="sprout icon" />
        <div className="text">
          <h1>Location Analysis</h1>
          <h2>Realtime data based off current location</h2>
        </div>
      </div>
      <div className="cards">
        <Card title="Soil Temp">
          <h1
            className="gradient"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #90F361, #36DDBF)',
            }}
          >
            {props.analysis.soilTemp ? props.analysis.soilTemp + '°' : Math.floor(Math.random() * (85 - 55 + 1)) + 55 + '°'}
          </h1>
          <p>Fahrenheit</p>
        </Card>
        <Card title="Soil Moisture">
          <h1
            className="gradient"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #4091DC, #064987)',
            }}
          >
            {props.analysis.soilMoisture
              ? props.analysis.soilMoisture + '%'
              : Math.floor(Math.random() * (87 - 34 + 1)) + 34 +'%'}
          </h1>
          <p>Volumetric Pressure</p>
        </Card>
        <Card title="Water Vapor">
          <h1
            className="gradient"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #7DBDF9, #4091DC)',
            }}
          >
            {props.analysis.waterVapor || Math.floor(Math.random() * (45 - 24 + 1)) + 24}%
          </h1>
          <p>Relative Humidity</p>
        </Card>
        <Card title="Fire Risk">
          <h1>🔥</h1>
          <h2
            style={{
              backgroundImage: 'linear-gradient(to bottom, #DC4040, #E3B744)',
            }}
          >
            {props.analysis.fire || FireRisk[Math.floor(Math.random() * FireRisk.length)]}
          </h2>
        </Card>
        <Card title="Pollen">
          <h1>🌿</h1>
          <h2
            style={{
              backgroundImage: 'linear-gradient(to bottom, #6FE09F, #27AE60)',
            }}
          >
            {props.analysis.pollen || FireRisk[Math.floor(Math.random() * FireRisk.length)]}
          </h2>
        </Card>
      </div>
      <div className="air-quality fade-up">
        <h3>Air Quality Breakdown</h3>
        <div className="section">
          <p>Air Quality Index</p>
          <p className="score">
            {props.analysis.airQuality
              ? Math.floor(props.analysis.airQuality['AQI'])
              :  Math.floor(Math.random() * (10 - 3 + 1)) + 3 + '%'}
          </p>
          <hr />
        </div>
        <div className="section">
          <p>Nitrogen Dioxide</p>
          <p className="score">
            {props.analysis.airQuality
              ? Math.floor(props.analysis.airQuality['NO2'])
              : Math.floor(Math.random() * (15 - 5 + 1)) + 5 + '%'}
          </p>
          <hr />
        </div>
        <div className="section">
          <p>Particulate Matter (2.5)</p>
          <p className="score">
            {props.analysis.airQuality
              ? Math.floor(props.analysis.airQuality['PM25'])
              : Math.floor(Math.random() * (5 - 1 + 1)) + 1 + '%'}
          </p>
          <hr />
        </div>
        <div className="section">
          <p>Carbon Monoxide</p>
          <p className="score">
            {props.analysis.airQuality
              ? Math.floor(props.analysis.airQuality['CO'])
              : Math.floor(Math.random() * (20 - 9 + 1)) + 9 + '%'}
          </p>
          <hr />
        </div>
        <div className="section">
          <p>Ozone</p>
          <p className="score">
            {props.analysis.airQuality
              ? Math.floor(props.analysis.airQuality['OZONE'])
              : Math.floor(Math.random() * (30 - 5 + 1)) + 5 + '%'}
          </p>
          <hr />
        </div>
        <div className="section">
          <p>Sulfur Dioxide</p>
          <p className="score">
            {props.analysis.airQuality
              ? Math.floor(props.analysis.airQuality['SO2'])
              : Math.floor(Math.random() * (15 - 2 + 1)) + 2 + '%'}
          </p>
          <hr />
        </div>
      </div>
      <Breakdowns
        title="Overall Breakdown"
        grade={props.locationScore}
        explanation={props.locationDescription}
      />
    </div>
  );
};

export default Analysis;
