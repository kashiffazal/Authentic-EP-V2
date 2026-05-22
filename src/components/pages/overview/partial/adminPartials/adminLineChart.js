import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { Line } from '@ant-design/charts';

const DemoLine = (props) => {
  const [data, setData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    props.data && setData(props.data.data);
  }, [props]);
  const config = {
    data,
    xField: 'month-name',
    yField: 'count',
    seriesField: 'sp_name',
    yAxis: {
      label: {
        // formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
      },
    },
    legend: {
      position: 'top-left',
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'wave-in',
        duration: 2000,
      },
    },
    // animation: false
  };
  return <div className="box chart-container">
    <h3 className="current_label_sub_heading p-b-10">{props.data && props.data.label}</h3>
    <Button type="primary" ghost className="side-right-btn" onClick={() => history.push(process.env.PUBLIC_URL + '/e/servicePlainForm')}>Add New Service</Button>
    <Spin spinning={props.loader} className="spin-loader" tip="Loading, Please wait...">
      <Line {...config} />
    </Spin>
  </div>;
};
export default DemoLine;