import React, { Component } from 'react';
import { Modal } from 'antd';
import ScreenLoader from '../../../../externalComponents/screen-loader';
import DataTable from '../../../../externalComponents/andt-data-table-component';
import { HTTP, SaveArrLocalStorage } from '../../../../services';

class ClientDraftLog extends Component {
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
      }, {
        title: 'Edit',
        align: 'center',
        width: '9%',
        render: (record, row) =>
          <button title="Edit" className="btnToLink" onClick={() => SaveArrLocalStorage(row.id, "clientForm")}><i className="fs-18 las la-edit link-color"></i></button>
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
              { label: 'Name', value: 'name' },
              { label: 'Gender', value: 'gender' },
              { label: 'NDIS Number', value: 'ndisNumber' },
              { label: 'Suburb', value: 'suburb' }
            ]}
          />
        </ScreenLoader>
      </div>
    )//End Return statement
  }//End End Render
  componentDidMount() {
    this.setState({ getLoader: true });
    HTTP('get', '/client/get/getDraftList/').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ list_data: res.data });
      this.props.getCount(res.data.length);
    });
  }//End componentDidMount
}//End class

export default ClientDraftLog;
