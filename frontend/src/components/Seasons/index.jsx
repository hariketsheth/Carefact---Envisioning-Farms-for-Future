import { useEffect, useState } from 'react';

import './style.scss';

import cloudy from 'assets/cloudy.svg';
import raining from 'assets/raining.svg';
import sunny from 'assets/sunny.svg';

function dateFromDay(year, day){
  let newYear;
  if (day > 365) {
    newYear = year + 1;
  } else {
    newYear = year;
  }
  var date = new Date(newYear, 0); // initialize a date in `year-01-01`
  return new Date(date.setDate(day % 365)); // add the number of days
}

const options = { month: "short", day: "numeric" };

const Seasons = (props) => {
  const [season, setSeason] = useState('Spring');
  const [color, setColor] = useState('rgba(39, 174, 96, 1)');
  const [high, setHigh] = useState('63');
  const [low, setLow] = useState('39');
  const [allWeather, setWeather] = useState([
    {
      avgTemp: '41°',
      date: 'April 19',
      weather: 'rainy'
    },
    {
      avgTemp: '46°',
      date: 'April 20',
      weather: 'cloudy'
    },
    {
      avgTemp: '49°',
      date: 'April 21',
      weather: 'cloudy'
    },
    {
      avgTemp: '59°',
      date: 'April 22',
      weather: 'cloudy'
    },
    {
      avgTemp: '58°',
      date: 'April 23',
      weather: 'rainy'
    }
  ])

  useEffect(() => {
    const realDay = props.day % 365;
    let year = (props.day > 365) ? '2024' : '2023';
    let multiplier = 73;
    let weather1, weather2, weather3, weather4, weather5 = null;
    if (realDay >= 79 && realDay < 171) {
      setSeason('Spring ' + year);
      setColor('rgba(39, 174, 96, 1)');
      multiplier = 53;
      weather1 = 'cloudy';
      weather2 = 'rainy';
      weather3 = 'rainy';
      weather4 = 'cloudy';
      weather5 = 'cloudy'
      setHigh(Math.floor(multiplier + Math.random() * 10));
      setLow(Math.floor(multiplier - Math.random() * 10));
    } else if (realDay >= 171 && realDay < 265) {
      setSeason('Summer ' + year);
      setColor('rgba(237, 193, 81, 1)');
      weather1 = 'cloudy';
      weather2 = 'sunny';
      weather3 = 'sunny';
      weather4 = 'sunny';
      weather5 = 'sunny';
      setHigh(Math.floor(multiplier + Math.random() * 10));
      setLow(Math.floor(multiplier - Math.random() * 10));
    } else if (realDay >= 265 && realDay < 355) {
      setSeason('Fall ' + year);
      setColor('rgba(237, 193, 81, 1)');
      multiplier = 40;
      weather1 = 'sunny';
      weather2 = 'cloudy';
      weather3 = 'cloudy';
      weather4 = 'cloudy';
      weather5 = 'cloudy';
      setHigh(Math.floor(multiplier + Math.random() * 10));
      setLow(Math.floor(multiplier - Math.random() * 10));
    } else {
      setSeason('Winter ' + year);
      setColor('rgba(64, 145, 220, 1)');
      multiplier = 9;
      weather1 = 'cloudy';
      weather2 = 'rainy';
      weather3 = 'rainy';
      weather4 = 'rainy';
      weather5 = 'rainy';
      setHigh(Math.floor(multiplier + Math.random() * 10));
      setLow(Math.floor(multiplier - Math.random() * 10));
    }

    setWeather([
      {
        avgTemp: Math.floor(multiplier + Math.random() * 5) + '°',
        date: dateFromDay(year, (props.day + 1) % 365).toLocaleDateString(undefined, options),
        weather: weather1
      },
      {
        avgTemp: Math.floor(multiplier + Math.random() * 5) + '°',
        date: dateFromDay(year, (props.day + 2) % 365).toLocaleDateString(undefined, options),
        weather: weather2
      },
      {
        avgTemp: Math.floor(multiplier + Math.random() * 5) + '°',
        date: dateFromDay(year, (props.day + 3) % 365).toLocaleDateString(undefined, options),
        weather: weather3
      },
      {
        avgTemp: Math.floor(multiplier + Math.random() * 5) + '°',
        date: dateFromDay(year, (props.day + 4) % 365).toLocaleDateString(undefined, options),
        weather: weather4
      },
      {
        avgTemp: Math.floor(multiplier + Math.random() * 5) + '°',
        date: dateFromDay(year, (props.day + 5) % 365).toLocaleDateString(undefined, options),
        weather: weather5
      }
    ]);
  }, [props.day])

  return (
    <div
      className="seasons"
      style={{
        backgroundImage: `linear-gradient(to right, ${color} 60%, rgba(178, 178, 178, 0)), url('seasons.png')`
      }}
    >
      <div className="season">
        <h2>Season</h2>
        <h1>{season}</h1>
      </div>
      <div className="temperature">
        <h2>Temp</h2>
        <h1>{high}°/{low}°</h1>
      </div>
      <div className="weather">
        {
          allWeather.map((entry) => {
            let currWeather = sunny;
            if (entry.weather === 'cloudy') {
              currWeather = cloudy;
            } else if (entry.weather === 'raining') {
              currWeather = raining;
            }
            return (
              <div className="weather-entry">
                <img src={currWeather} alt="current weather"/>
                <div className="text">
                  <h1>{entry.avgTemp}</h1>
                  <h2>{entry.date}</h2>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Seasons