import React, { Component } from 'react'
import { Timeline } from 'antd';
import PageTitle from '../mutual/pageTitle';
import ScreenLoader from '../../externalComponents/screen-loader';
import { ClockCircleOutlined } from '@ant-design/icons';
import ProfileForm from './form';

class ViewProfile extends Component {
  state = {
    getLoader: false
  }//End state
  render() {
    const st = this.state;
    return (
      <React.Fragment>
        <PageTitle
          titleIcon="las la-user"
          titleSpan="User"
          titleHeading="Profile"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-user', label: 'User Profile' }
          ]}
        />
        <ProfileForm loader={(e) => this.setState({ getLoader: e })} />

        <div className="container">
          <ScreenLoader active={st.getLoader}>
            <h3 className="text-center">Activity Timeline</h3>
            <br />
            <Timeline mode="alternate">
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>Sed ut perspiciatis unde omnis iste natus error</Timeline.Item>
              <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>
            </Timeline>
          </ScreenLoader>
        </div>


      </React.Fragment>
    )//End return
  }//Ebd render
}//End class
export default ViewProfile;