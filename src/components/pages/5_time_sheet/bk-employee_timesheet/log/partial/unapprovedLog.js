import React, { Component } from 'react';
import ScreenLoader from '../../../../../externalComponents/screen-loader';
import DataTable from '../../../../../externalComponents/andt-data-table-component';
import { HTTP, SaveArrLocalStorage, AccessControl } from '../../../../../services';

class StaffTimeSheetUnapproved extends Component {
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
    AccessControl(36) &&
      columns.push({
        title: 'Edit',
        align: 'center',
        width: '5%',
        render: (record, row) =>
          AccessControl(36) && <button title="Edit" className="btnToLink" onClick={() => SaveArrLocalStorage(row.id, "staffTimesheet")}><i className="fs-18 las la-edit link-color"></i></button>
      });
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
      this.setState({ list_data: res.data });
    });
  }//End componentDidMount
}//End class

export default StaffTimeSheetUnapproved;
