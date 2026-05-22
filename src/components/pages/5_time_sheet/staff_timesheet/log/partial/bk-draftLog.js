import React, { Component } from 'react';
import ScreenLoader from '../../../../../externalComponents/screen-loader';
import DataTable from '../../../../../externalComponents/andt-data-table-component';
import { HTTP, SaveArrLocalStorage } from '../../../../../services';

class StaffTimesheetDraft extends Component {
  state = {
    getLoader: false,
    list_data: []
  };

  render() {
    const st = this.state;
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '5%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Fortnight Start Date',
        dataIndex: 'fortnightStartDate',
        width: '20%',
        sorter: (a, b) => a.fortnightStartDate.localeCompare(b.fortnightStartDate),
      }, {
        title: 'Fortnight End Date',
        dataIndex: 'fortnightEndDate',
        width: '20%',
        sorter: (a, b) => a.fortnightEndDate.localeCompare(b.fortnightEndDate),
      }, {
        title: 'Total Hour(s)',
        dataIndex: 'th',
        width: '20%',
        sorter: (a, b) => a.th.localeCompare(b.th),
      }, {
        title: 'Last Update Date',
        dataIndex: 'lastUpdate',
        width: '30%',
        sorter: (a, b) => a.lastUpdate.localeCompare(b.lastUpdate),
      }, {
        title: 'Edit',
        align: 'center',
        width: '5%',
        render: (record, row) =>
          <button title="Edit" className="btnToLink" onClick={() => SaveArrLocalStorage(row.id, "staffTimesheet")}><i className="fs-18 las la-edit link-color"></i></button>
      }
    ];
    return (
      <div>
        <ScreenLoader active={st.getLoader}>
          <DataTable
            columns={columns}
            styleType={2}
            dataSource={st.list_data}
            showSizeChanger={true}
            pagination={{ itemDetails: true, showOnSinglePage: true }}
            customFilter="true"
            customFilterLabel="Filter by"
            customFilterCol={[
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
    HTTP('get', '/timesheetStaff/get/getDraftList/').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ list_data: res.data });
      this.props.getCount(res.data.length,res.unapCount,res.aproCount);
    });
  }//End componentDidMount
}//End class

export default StaffTimesheetDraft;
