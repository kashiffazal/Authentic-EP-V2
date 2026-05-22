import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreGet from '../store/get';
class DevelopedBy extends Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.props.stv.developed_by_html }} />
    );//End return
  }//End render
}//End class

export default connect(StoreGet)(DevelopedBy);