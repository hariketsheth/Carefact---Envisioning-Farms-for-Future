import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';

import CropRotation from '../Statistics/CropRotation';
import EstimatedFinancials from '../Statistics/EstimatedFinancials';
import EnvironmentalStrain from '../Statistics/EnvironmentalStrain';
import FarmBreakdown from '../Statistics/FarmBreakdown';
import Breakdowns from '../Statistics/Breakdowns';

import title from '../../assets/harveststats.svg';
import './style.scss';

const StatsModal = (props) => {
  const [bounds, setBounds] = useState({
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
  });

  let draggleRef = React.createRef();

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      bounds: {
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
      },
    });
  };

  return (
    <div className="StatsModal">
      <Modal
        className="Modal"
        style={{ top: 30 }}
        visible={props.visible}
        onCancel={props.setModal}
        onOk={props.setModal}
        footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={false}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <img className="title" src={title} alt="title" />
        <div className="tstats-container">
          <Breakdowns
            title="Location Score"
            grade={props.locationScore}
            criteria="Criteria based on soil quality, moisture, and
            overall location."
            explanation={props.locationDescription}
          />
          <Breakdowns
            title="Environmental Impact"
            grade={props.environmentScore}
            criteria="Criteria based on a plot's effect on the environment."
            explanation={props.environmentDescription}
          />

          <FarmBreakdown statsData={props.statsData}/>
        </div>
        <div className="bstats-container">
          <CropRotation statsData={props.statsData}/>
          <EstimatedFinancials statsData={props.statsData}/>
          <EnvironmentalStrain statsData={props.statsData}/>
        </div>
      </Modal>
    </div>
  );
};

export default StatsModal;
