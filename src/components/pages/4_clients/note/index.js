import React, { Component } from 'react'
import { Button, Badge } from 'antd';
import AddNodeModule from './addNoteModal';
import DataTable from '../../../externalComponents/andt-data-table-component';
import ScreenLoader from '../../../externalComponents/screen-loader';
import PageTitle from '../../mutual/pageTitle';
import { HTTP, LogResetList, AccessControl } from '../../../services';


class ClientNote extends Component {
  state = {
    viewNoteModal: false,
    getLoader: false,
    selectedClientId: '',
    data: []
  }//End state

  addCount = (data) => {

    let listData = this.state.data;
    let isIncrease = false;
    listData.forEach((item, i) => {
      if (item.id === data.client_ref_id) {
        listData[i].count = parseInt(item.count) + 1;
        isIncrease = true;
      }//End if condition
    });
    if (!isIncrease) {
      data.count = 1;
      this.setState({ data: LogResetList(data, this.state.data) });
    } else {
      this.setState({ data: listData });
    }//End if condition

  }//End function

  render() {
    const st = this.state;
    //@ Web View Column
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '5%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Client Name',
        dataIndex: 'client_name',
        width: '70%',
        sorter: (a, b) => a.client_name.localeCompare(b.client_name),
      }, {
        title: 'Number of messages',
        dataIndex: 'count',
        align: 'center',
        width: '20%',
        sorter: (a, b) => a.count - b.count,
        render: (record, row) =>
          <button title="View Details or Add" className="btnToLink" onClick={() => this.setState({ viewNoteModal: true, selectedClientId: row.id })}><Badge count={record} className="primary-badge" /></button>
      }, {
        title: 'Action',
        align: 'center',
        width: '5%',
        render: (record, row) =>
          <div className="text-center">
            <button title="View Details or Add" className="btnToLink" onClick={() => this.setState({ viewNoteModal: true, selectedClientId: row.id })}><i className="fs-18 las la-table link-color"></i></button>
          </div>
      }
    ];
    //@ Mobile View Column
    const mobileCol = [
      {
        title: 'Client Name',
        dataIndex: 'client_name',
        width: '100%',
        className: 'mobile-col',
        render: (record, row) =>
          <div className="col-data" style={{ width: window.screenWidthMobile }}>
            <div className="details">
              <div className="data">
                <div className="main-value">{record}</div>
                <div className="sub-value">
                  <span className="label">Number of Messages:</span>
                  <span className="value">{row.count}</span>
                </div>
              </div>
            </div>
            <div className="action"><button title="View Details or Add" className="btnToLink" onClick={() => this.setState({ viewNoteModal: true, selectedClientId: row.id })}><i className="fs-18 las la-table link-color"></i></button></div>
          </div>
      }];
    return (
      <div>
        <PageTitle
          titleIcon="las la-sticky-note"
          titleSpan="Client Status"
          titleHeading="Note"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-id-card-alt', label: 'Client' },
            { iconLas: 'las la-sticky-note', label: 'Client Status Note' }
          ]}
          render={
            AccessControl(28) &&
            <AddNodeModule clientId={st.selectedClientId} show={st.viewNoteModal} onClose={() => this.setState({ viewNoteModal: false })} addCount={(data) => this.addCount(data)}>
              <Button type="primary" size="large" onClick={() => this.setState({ viewNoteModal: true, selectedClientId: '' })}>Add Note</Button>
            </AddNodeModule>
          }
        />
        {!AccessControl(28) && <AddNodeModule clientId={st.selectedClientId} show={st.viewNoteModal} onClose={() => this.setState({ viewNoteModal: false })} />}

        {AccessControl(29) &&
          <div className={window.webviewMobile ? '' : 'container'}>
            <ScreenLoader active={st.getLoader}>
              <DataTable
                classNameContainer={window.webviewMobile ? 'mobile-table' : ''}
                columns={window.webviewMobile ? mobileCol : columns}
                styleType={2}
                dataSource={st.data}
                showSizeChanger={true}
                pagination={{ itemDetails: true, showOnSinglePage: true }}
                customFilter="true"
                customFilterLabel="Filter by"
                customFilterCol={[
                  { label: 'Client Name', value: 'client_name' },
                  { label: 'Count', value: 'count' }
                ]}
              />
            </ScreenLoader>
          </div>
        }
      </div>
    )//End return
  }//End render
  componentDidMount() {
    this.setState({ getLoader: true });
    HTTP('get', '/clientNote/get/').then(res => {
      this.setState({ getLoader: false });
      if (!res) return false;
      //console.log(res)
      this.setState({ data: res.data });
    });
  }//End componentDidMount
}//End class
export default ClientNote;