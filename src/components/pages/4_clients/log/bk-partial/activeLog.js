import React, { Component } from 'react';
import { Modal } from 'antd';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import DataTable from '../../../../externalComponents/andt-data-table-component';
import { HTTP, SaveArrLocalStorage, AccessControl } from '../../../../services';

class ClientActiveLog extends Component {
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
        title: 'Name',
        dataIndex: 'name',
        width: '18%',
        sorter: (a, b) => a.name.localeCompare(b.name),
      }, {
        title: 'Date of birth',
        dataIndex: 'dateOfBirth',
        width: '12%',
        sorter: (a, b) => a.dateOfBirth.localeCompare(b.dateOfBirth),
      }, {
        title: 'Contact No',
        dataIndex: 'contactNumber',
        width: '12%',
        sorter: (a, b) => a.contactNumber.localeCompare(b.contactNumber),
      }, {
        title: 'Email',
        dataIndex: 'email',
        width: '18%',
        sorter: (a, b) => a.email.localeCompare(b.email),
      }, {
        title: 'NDIS Number',
        dataIndex: 'ndisNumber',
        width: '16%',
        sorter: (a, b) => a.ndisNumber.localeCompare(b.ndisNumber)
      }, {
        title: 'Suburb',
        dataIndex: 'suburb',
        width: '10%',
        sorter: (a, b) => a.suburb.localeCompare(b.suburb)
      }
    ];
    AccessControl('22,23') &&
      columns.push({
        title: 'Action',
        align: 'center',
        width: '9%',
        render: (record, row) =>
          <div className="text-center">
            {AccessControl(23) && <button title="View Details" className="btnToLink" onClick={() => this.setState({ visibleViewModal: true, pdf_path: row.pdf_path })}><i className="fs-18 las la-table link-color"></i></button>}
            {AccessControl(23) && <i className="list_view_icon_sap las la-redo"></i>}
            {AccessControl(22) && <button title="Edit" className="btnToLink" onClick={() => SaveArrLocalStorage(row.id, "clientForm")}><i className="fs-18 las la-edit link-color"></i></button>}
          </div>
      })
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
              { label: 'Name', value: 'name' },
              { label: 'Gender', value: 'gender' },
              { label: 'NDIS Number', value: 'ndisNumber' },
              { label: 'Suburb', value: 'suburb' }
            ]}
          />
        </ScreenLoader>

        <Modal
          width={960}
          maskClosable={false}
          className="hide-footer"
          centered={true}
          title={'View Client Detailed File'}
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
    HTTP('get', '/client/get/getList/').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ list_data: res.data });
      this.props.getCount(res.data.length, res.draftCount);
    });
  }//End componentDidMount
}//End class

export default ClientActiveLog;
