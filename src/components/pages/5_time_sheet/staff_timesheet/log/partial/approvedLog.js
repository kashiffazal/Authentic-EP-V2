import React, { Component } from 'react';
import { Tooltip } from 'antd';
import ScreenLoader from '../../../../../externalComponents/screen-loader';
import DataTable from '../../../../../externalComponents/andt-data-table-component';
import { HTTP, AccessControl } from '../../../../../services';
import ViewPDFInModal from '../../../../mutual/viewPDFInModal';

class StaffTimesheetApproved extends Component {
  state = {
    getLoader: false,
    visibleViewModal: false,
    list_data: [],
    statusList: {}
  };

  render() {
    const st = this.state;
    const actionCol = (record, row) => (
      <div className="text-center">
        {AccessControl(39) && <button title="View Details" className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, pdf_path: row.pdf_path })}><i className="fs-18 las la-table link-color"></i></button>}
        {/* {AccessControl(39) && <i className="list_view_icon_sap las la-redo"></i>} */}
        {/* {AccessControl(38) && <button title="Edit" className="btnToLink" onClick={() => SaveArrLocalStorage(row.id, "staffTimesheet")}><i className="fs-18 las la-edit link-color"></i></button>} */}
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
        width: '15%',
        sorter: (a, b) => a.fortnightStartDate.localeCompare(b.fortnightStartDate),
      }, {
        title: 'Fortnight End Date',
        dataIndex: 'fortnightEndDate',
        width: '15%',
        sorter: (a, b) => a.fortnightEndDate.localeCompare(b.fortnightEndDate),
      }, {
        title: 'Total Hour(s)',
        dataIndex: 'th',
        width: '15%',
        sorter: (a, b) => a.th.localeCompare(b.th),
      }, {
        title: 'Last Update Date',
        dataIndex: 'lastUpdate',
        width: '20%',
        sorter: (a, b) => a.lastUpdate.localeCompare(b.lastUpdate),
      },
    ];
    AccessControl(73) &&
      columns.push({
        title: 'View',
        align: 'center',
        width: '10%',
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
            {AccessControl(73) && <div className="action">{actionCol(record, row)}</div>}
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
        <ViewPDFInModal title='View Staff Timesheet Detailed File' show={st.visibleViewModal} close={() => this.setState({ visibleViewModal: false })} pdfPath={st.pdf_path} />
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    this.setState({ getLoader: true });
    HTTP('get', '/timesheetStaff/get/getApprovedList/').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ list_data: res.data, statusList: res.statusList });
      this.props.count(res.data.length);
      this.props.setStatusList(res.statusList);
    });
  }//End componentDidMount
}//End class

export default StaffTimesheetApproved;
