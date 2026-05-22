import React, { Component } from 'react';
import { Result, Button } from 'antd';

class Unapproved extends Component {
  render() {
    return (
      <div className="conEmail">
        <Result
          status="warning"
          title="UNAPPROVED"
          subTitle={`Your account is not approved, please contact your administrator`}
          extra={[
            <Button key={1} onClick={() => this.props.history.push("/login")} type="primary" size="large">Go Back</Button>,
          ]}
        />
      </div>
    );//End return
  }//End render
}//End class

export default Unapproved;