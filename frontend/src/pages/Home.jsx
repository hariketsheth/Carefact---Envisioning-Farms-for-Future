/* eslint-disable */
import { useEffect, useState } from 'react';
import anime from 'animejs';
import { notification } from 'antd';
import DataEarth from './earthData.json';
import Map from 'components/Map';
import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';
import StatsModal from 'components/StatsModal';

import CurrentlySelected from 'components/CurrentlySelected';
import Seasons from 'components/Seasons';
import Timeline from 'components/Timeline';

import Analysis from 'components/Analysis';
import PlotType from 'components/PlotType';
import BigCurrentlySelected from 'components/BigCurrentlySelected';

import Date from 'components/Date';

//import * as AnalysisLib from "analysis";

let seasonsAnimation, timelineAnimation, currentlySelectedAnimation, analysisAnimation, cardAnimation, cards2Animation;
const HomePage = () => {
  const [sideBarPage, setSideBarPage] = useState('map');
  const [currentPlot, setCurrentPlot] = useState({});
  const [plots, setPlotOptions] = useState([]);
  const [visible, setModal] = useState(false);
  const [statsData, setStatsData] = useState([]);
  const [objects, setNewObjects] = useState({});
  const [day, setDay] = useState(108);
  const [environmentScore, setEnvironmentScore] = useState ('?');
  const [environmentDescription, setEnvironmentDescription] = useState('Click on a land plot to get your farm judged by drishti.')
  const [locationScore, setLocationScore] = useState ('?');
  const [locationDescription, setLocationDescription] = useState('Click on a land plot to get your farm judged by drishti.')

  const newSetSideBarPage = (sideBarPageParam) => {
    console.log(sideBarPageParam);
    console.log('hi')
    if (sideBarPageParam !== 'map') {
      if (seasonsAnimation) {
        seasonsAnimation.seek(0);
        seasonsAnimation.play();
        seasonsAnimation.finished.then(() => {
          seasonsAnimation.reverse();
        })
      }
      if(analysisAnimation) {
        analysisAnimation.seek(0);
        analysisAnimation.play();
        analysisAnimation.finished.then(() => {
          cardAnimation.play();
          cards2Animation.play();
          analysisAnimation.reverse();
        })
      }
      if (timelineAnimation) {
        timelineAnimation.seek(0);
        timelineAnimation.play();
        timelineAnimation.finished.then(() => {
          timelineAnimation.reverse();
        })
      }
      if (currentlySelectedAnimation) {
        currentlySelectedAnimation.seek(0);
        currentlySelectedAnimation.play();
        currentlySelectedAnimation.finished.then(() => {
          currentlySelectedAnimation.reverse();
        })
      }
    } else {
      if (seasonsAnimation) {
        cardAnimation.seek(0);
        cards2Animation.seek(0);
        seasonsAnimation.seek(1000);
        seasonsAnimation.play();
        seasonsAnimation.finished.then(() => {
          seasonsAnimation.reverse();
        })
      }
      if (timelineAnimation) {
        timelineAnimation.seek(1000);
        timelineAnimation.play();
        timelineAnimation.finished.then(() => {
          timelineAnimation.reverse();
        })
      }
      if (currentlySelectedAnimation) {
        currentlySelectedAnimation.seek(1000);
        currentlySelectedAnimation.play();
        currentlySelectedAnimation.finished.then(() => {
          currentlySelectedAnimation.reverse();
        })
      }
      if (analysisAnimation) {
        analysisAnimation.seek(1000);
        analysisAnimation.play();
        analysisAnimation.finished.then(() => {
          analysisAnimation.reverse();
        })
      }
    }
    setSideBarPage(side => sideBarPageParam);
  }

  const flipModal = () => {
    const currentObjects = Object.values(objects); 
      const tempStatsData = {}
      for (let i = 0; i < currentObjects.length; i++ ) {
        const currentObject = currentObjects[i];
        const sqFt = Math.floor((currentObject.width * currentObject.length) / 3.2808);

        const acres = AnalysisLib.sqftToAcre(sqFt);
        console.log(acres);
        if (currentObject.currentPlot.type === 'crop') {
          const name = currentObject.currentPlot.name;
          if (currentObject.currentPlot.name in tempStatsData) {
            tempStatsData[name] += parseFloat(acres.toFixed(2));
          } else {
            tempStatsData[name] = parseFloat(acres.toFixed(2));
          }
        }
      }
      const keys = Object.keys(tempStatsData);
      const newStatsData = []
      for (let j = 0; j < keys.length; j++ ) {
        newStatsData.push({
          crop: keys[j],
          acre: tempStatsData[keys[j]]
        })
      }
      setStatsData(d => newStatsData);
      if (currentObjects.length > 1) {
        setModal(!visible);
      } else {
        notification.open({
          description: "Please place some plots on the map first! I can't analyze empty fields!",
          placement: 'bottomLeft'
        });
      }
  };

  const [draw, setDraw] = useState(null);
  const [analysis, setAnalysis] = useState({});

  useEffect(async () => {

    const data=DataEarth;
    console.log(data);
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    setPlotOptions(data);

    analysisAnimation = anime({
      targets: '.right-into',
      translateX: -1200,
      duration: 1000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine'
    });

    seasonsAnimation = anime({
      targets: '.seasons',
      translateY: 200,
      duration: 1000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine'
    });

    cardAnimation = anime({
      targets: '.analysis .fade-up',
      translateY: -10,
      opacity: 100,
      duration: 1000,
      delay: function(el, i) { return i * 200; },
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine',
    });

    cards2Animation = anime({
      targets: '.plots .plot',
      translateY: -10,
      opacity: 100,
      duration: 1000,
      delay: function(el, i) { return i * 200; },
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine',
    });

    timelineAnimation = anime({
      targets: '.timeline',
      translateY: -200,
      duration: 1000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine'
    });

    currentlySelectedAnimation = anime({
      targets: '.currently-selected',
      translateY: -200,
      duration: 1000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine'
    });
  }, []);

  return (
    <div>
      <StatsModal
        locationDescription={locationDescription}
        locationScore={locationScore}
        environmentScore={environmentScore}
        environmentDescription={environmentDescription}
        visible={visible} setModal={flipModal}
        statsData={statsData}/>
      <NavBar />
      <SideBar setSideBarPage={newSetSideBarPage} setModal={flipModal} />
      <Map
        day={day}
        setCurrentPlot={setCurrentPlot}
        currentPlot={currentPlot}
        draw={draw}
        sideBarPage={sideBarPage}
        setDraw={setDraw}
        setAnalysis={setAnalysis}
        setNewObjects={setNewObjects}
        setEnvironmentScore={setEnvironmentScore}
        setEnvironmentDescription={setEnvironmentDescription}
        setLocationScore={setLocationScore}
        setLocationDescription={setLocationDescription}
      />
      <Timeline setDay={setDay} objects={objects} day={day}/>
      <CurrentlySelected currentPlot={currentPlot} />
      <Seasons day={day}/>
      <PlotType draw={draw} plots={plots} setCurrentPlot={setCurrentPlot}/>
      <BigCurrentlySelected currentPlot={currentPlot}/>
      <Analysis
        locationDescription={locationDescription}
        locationScore={locationScore}
       analysis={analysis}/>
      <Date day={day}/>
    </div>
  );
};

export default HomePage;
