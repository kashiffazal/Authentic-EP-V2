import React, { Component } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

class BoxWidgetMutual extends Component {
  render() {
    const pr = this.props;
    return (
      <Spin spinning={pr.loading} className="spin-loader" tip="Loading, Please wait...">
        <div className={`box ${pr.gradientClass} ${pr.className}`}>
          <div className={pr.glassClass ? pr.glassClass : ''}>
            <span className="label">{pr.label}</span>
            <span className="amount">{pr.amount}</span>
            {pr.arrow && (pr.arrow === 'down' ? <ArrowDownOutlined /> : <ArrowUpOutlined />)}
            <span className="sub_label">{pr.subLabel}</span>
          </div>
        </div>
      </Spin>
    );
  }
}

export default BoxWidgetMutual;