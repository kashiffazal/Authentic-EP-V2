import React, { Component } from 'react';

class DetailsInTooltip extends Component {
  render() {
    const dt = this.props.data;
    // console.log(dt);
    return (
      <>
        <strong>Support Worker:</strong> {dt.spw_name}<br />
        {dt.spw2_name && <><strong>Support Partner:</strong> {dt.spw2_name}<br /></>}
        <strong>Client Name:</strong> {dt.client_name}<br/>
        <strong>Frequency:</strong> {dt.frequency_name}<br/>
        <strong>Start Time:</strong> {dt.service_start_time}<br/>
        <strong>End Time:</strong> {dt.service_end_time}<br/>
      </>
    )//End return
  }//End render
}//End class
export default DetailsInTooltip;