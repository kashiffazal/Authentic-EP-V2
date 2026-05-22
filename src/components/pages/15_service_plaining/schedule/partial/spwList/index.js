import React, { Component } from 'react';
import { Avatar, List, Dropdown, Menu, Button } from 'antd';
import AvailabilityModal from './availabilityModal';
import ViewDetailsModal from './spwDetailsModal';
import { AccessControl, GetObjectFromArr, UpdateRowInList } from '../../../../../services';

class SPWList extends Component {
  state = {
    viewDetails: false,
    viewAvailability: false,
    selectedSPW: {},
    spwList: [],
    sort: false
  }//End state

  filterSpw = (e) => {
    var filteredData = this.props.spwList.filter((a) => { return a.name.toLowerCase().includes(e.toLowerCase()); });
    filteredData = this.state.sort ? filteredData.reverse() : filteredData;
    this.setState({ spwList: filteredData }, () => { this.props.onFilter(filteredData); })
  }//End function

  onSort = () => {
    this.setState({ spwList: this.state.spwList.reverse(), sort: !this.state.sort }, () => {
      this.props.onFilter(this.state.spwList);
    })
  }//End function

  render() {
    const pr = this.props;
    const st = this.state;
    const gridType = pr.gridColumn ? pr.gridColumn.type : '';
    return (
      <div>
        <div className={`sort-and-filter ${(gridType === '4Weeks' || gridType === 'month') ? 'smallFilterCols' : ''}`}>
          <i className="las la-search" /><input className="search-field" onChange={(e) => this.filterSpw(e.target.value)} placeholder="Search..." />
          <Button size="small" type="primary" ghost onClick={(() => this.onSort())}><i className={`las la-sort-alpha-${st.sort ? 'up-alt' : 'down'}`} /></Button>
        </div>
        <div className="open-shift">
          <div className="first"><i className="las la-exclamation-circle" /></div>
          <div className="second">
            <div className="heading">Open Shift(s)</div>
            <div className="desc">Req. for Replacement</div>
          </div>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={st.spwList}
          renderItem={(item) => (
            <div className="spw-list">
              <div className="sp-detail">
                <List.Item>
                  <button type="button" className="btnToLink w-full text-left" onClick={() => pr.onSelect && pr.onSelect(item.id)}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.profileImage}
                        // size="large" 
                        size={45}
                        // className={`avatar-color-${parseInt(item.key < 10 ? item.key.toString().charAt(0) : item.key.toString().charAt(1))}`}
                        style={{ background: item.slug_color }}
                      >{item.nameSlug}</Avatar>}
                      title={item.name}
                      description={<span>{item.availableDays}<br />{item.totalShifts} Total Shifts</span>}
                    />
                  </button>
                </List.Item>
              </div>
              {AccessControl('129,130') &&
                <div className="sp-action">
                  <Dropdown size="small" overlay={
                    <Menu key={1} className="schedule-spw-dropdown">
                      {AccessControl(129) &&
                        <Menu.Item key={1}>
                          <button className="btnToLink w-full text-left" onClick={() => this.setState({ viewDetails: true, selectedSPW: item })}><i className="las la-table" /> Details</button>
                        </Menu.Item>
                      }
                      {AccessControl(130) &&
                        <Menu.Item key={2}>
                          <button className="btnToLink w-full text-left" onClick={() => this.setState({ viewAvailability: true, selectedSPW: item })}><i className="las la-business-time" /> Availability</button>
                        </Menu.Item>
                      }
                    </Menu>
                  } placement="bottomRight" trigger={['click']}>
                    <button type="button" className="btnToLink"><i className="las la-ellipsis-v" /></button>
                  </Dropdown>
                </div>
              }
            </div>
          )}
        />
        <ViewDetailsModal data={st.selectedSPW} show={st.viewDetails} onClose={() => this.setState({ viewDetails: false })} updateData={(e) => {
          // console.log(e);
        }} />
        <AvailabilityModal data={st.selectedSPW} show={st.viewAvailability} onClose={() => this.setState({ viewAvailability: false })} updatedData={(e) => {
          //Update availability in SPW state from 'availabilityEditModal' to index file
          let row = GetObjectFromArr(st.selectedSPW.id, 'id', pr.spwList);
          row.days_availibility_json = e;
          pr.updateSPWList(UpdateRowInList(row, pr.spwList));
        }} />
      </div>
    )//End return
  }//End render
  componentDidMount() { this.setState({ spwList: this.props.spwList }); }
  componentDidUpdate(prevProps) {
    if (this.props.spwList !== prevProps.spwList) {
      this.setState({ spwList: this.props.spwList });
    }//End if condition
  }//End componentDidUpdate
}//End class
export default SPWList;