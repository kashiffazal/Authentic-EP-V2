import React, { Component } from 'react';
import { Modal } from 'antd';
import ScreenLoader from '../../../../../externalComponents/screen-loader';
import DataTable from '../../../../../externalComponents/andt-data-table-component';
import { HTTP, SaveArrLocalStorage, AccessControl } from '../../../../../services';

class StaffTimesheetApproved extends Component {
  state = {
    getLoader: false,
    visibleViewModal: false,
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
    AccessControl('38,39') &&
      columns.push({
        title: 'Edit',
        align: 'center',
        width: '10%',
        render: (record, row) =>
          <div className="text-center">
            {AccessControl(39) && <button title="View Details" className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, pdf_path: row.pdf_path })}><i className="fs-18 las la-table link-color"></i></button>}
            {AccessControl(39) && <i className="list_view_icon_sap las la-redo"></i>}
            {AccessControl(38) && <button title="Edit" className="btnToLink" onClick={() => SaveArrLocalStorage(row.id, "staffTimesheet")}><i className="fs-18 las la-edit link-color"></i></button>}
          </div>
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
        <Modal
          width={960}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          title={'View Staff Timesheet Detailed File'}
          visible={st.visibleViewModal}
          onOk={() => this.setState({ visibleViewModal: false })}
          onCancel={() => this.setState({ visibleViewModal: false })}
        >
        {/* https://docs.google.com/viewerng/viewer?url=https://blockims.horizonstradingcorporation.com/server/report_files/1/general_journal_report_1.pdf?k=ac0f */}
          <iframe title="Details" src={window.googleDocViewerPDF + st.pdf_path} className="pdfIframe" allow="autoplay; encrypted-media" allowtransparency="true" allowFullScreen/>
        </Modal>
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    this.setState({ getLoader: true });
    HTTP('get', '/timesheetStaff/get/getApprovedList/').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ list_data: res.data });
    });
  }//End componentDidMount
}//End class

export default StaffTimesheetApproved;
