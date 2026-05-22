import React, { Component } from 'react';
import { Tooltip } from 'antd';
import ScreenLoader from '../../../../../externalComponents/screen-loader';
import DataTable from '../../../../../externalComponents/andt-data-table-component';
import { HTTP, SaveArrLocalStorage, AccessControl } from '../../../../../services';

class StaffTimeSheetUnapproved extends Component {
  state = {
    getLoader: false,
    list_data: [],
    statusList: {}
  };

  render() {
    const st = this.state;
    const actionCol = (record, row) => (
      <div className="text-center">
        {AccessControl(71) && <button title="Edit" className="btnToLink" onClick={() => SaveArrLocalStorage({ id: row.id, swp_name: row.swp_name }, "staffTimesheet")}><i className="fs-18 las la-edit link-color"></i></button>}
      </div>
    );
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '5%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Support Worker',
        dataIndex: 'swp_name',
        width: '20%',
        sorter: (a, b) => a.swp_name.localeCompare(b.swp_name),
      }, {
        title: 'Fortnight Start Date',
        dataIndex: 'fortnightStartDate',
        width: '18%',
        sorter: (a, b) => a.fortnightStartDate.localeCompare(b.fortnightStartDate),
      }, {
        title: 'Fortnight End Date',
        dataIndex: 'fortnightEndDate',
        width: '18%',
        sorter: (a, b) => a.fortnightEndDate.localeCompare(b.fortnightEndDate),
      }, {
        title: 'Total Hour(s)',
        dataIndex: 'th',
        width: '15%',
        sorter: (a, b) => a.th.localeCompare(b.th),
      }, {
        title: 'Last Update Date',
        dataIndex: 'lastUpdate',
        width: '19%',
        sorter: (a, b) => a.lastUpdate.localeCompare(b.lastUpdate),
      }
    ];
    AccessControl(71) &&
      columns.push({
        title: 'Sign',
        align: 'center',
        width: '5%',
        render: (record, row) => actionCol(record, row)
      });

    //@ Mobile View Column
    const mobileCol = [
      {
        title: 'Support Worker',
        dataIndex: 'swp_name',
        width: '100%',
        className: 'mobile-col',
        render: (record, row) =>
          <div className="col-data" style={{ width: window.screenWidthMobile }}>
            <div className="details">
              <div className="icon">
                <Tooltip placement="topRight" title={st.statusList[row.status].name} trigger='click'>
                  <i className={
                    st.statusList[row.status]['mobileIcon'] ?
                      st.statusList[row.status]['mobileIcon'] :
                      st.statusList[row.status]['icon']
                  } style={{ background: st.statusList[row.status]['color'] }} />
                </Tooltip>
              </div>
              <div className="data">
                <div className="main-value">{record}</div>
                <div className="sub-value">
                  <span className="label">Total Hour(s):</span>
                  <span className="value">{row.th}</span>
                </div>
                <div className="foot-value">
                  <span className="label">Fortnight Date:</span>
                  <span className="value">{row.fortnightStartDate} to {row.fortnightEndDate}</span>
                </div>
              </div>
            </div>
            {AccessControl(71) && <div className="action">{actionCol(record, row)}</div>}
          </div>
      }];



    return (
      <div>
        <ScreenLoader active={st.getLoader}>
          <DataTable
            classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
            columns={window.webviewMobile ? mobileCol : columns}
            styleType={2}
            dataSource={st.list_data}
            showSizeChanger={true}
            pagination={{ itemDetails: true, showOnSinglePage: true }}
            customFilter="true"
            customFilterLabel="Filter by"
            customFilterCol={[
              { label: 'Support Worker', value: 'swp_name' },
              { label: 'Fortnight Start Date', value: 'fortnightStartDate' },
              { label: 'Fortnight End Date', value: 'fortnightEndDate' },
              { label: 'Total Hour(s)', value: 'th' },
              { label: 'Last Update', value: 'lastUpdate' }
            ]}
          />
        </ScreenLoader>
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    this.setState({ getLoader: true });
    HTTP('get', '/timesheetStaff/get/getUnapprovedList/').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ list_data: res.data, statusList: res.statusList });
      this.props.count(res.data.length);
      this.props.setStatusList(res.statusList);
    });
  }//End componentDidMount
}//End class

export default StaffTimeSheetUnapproved;
