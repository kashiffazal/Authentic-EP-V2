import React, { Component } from 'react';
import { Tag, Popconfirm, Row, Col } from 'antd';
import DataTable from '../../../externalComponents/andt-data-table-component';
import { HTTP, SaveArrLocalStorage, DeleteRowFromList } from '../../../services';
import PageTitle from '../../mutual/pageTitle';
import ScreenLoader from '../../../externalComponents/screen-loader';
import './styles.less';

class ColumnPresetLog extends Component {
  constructor(props) {
    super(props)
    this.state = { loader: false, deleteLoader: {}, data: [] };
  }//End constructor

  deletePreset = (id) => {
    let deleteLoader = this.state.deleteLoader;
    deleteLoader[id] = true;
    this.setState({ deleteLoader });
    HTTP('get', '/reporting/post/deleteColumnPreset/' + id).then(res => {
      deleteLoader[id] = false;
      this.setState({ deleteLoader });
      if (!res) { return false; }
      this.setState({ data: DeleteRowFromList(this.state.data, id) });
    });
  }//End function

  render() {
    const st = this.state;
    const columns = [
      {
        title: 'Sr',
        dataIndex: 'key',
        width: '6%',
        sorter: (a, b) => a.key - b.key,
      }, {
        title: 'Report Title',
        dataIndex: 'report_title',
        width: '20%',
        sorter: (a, b) => a.report_title.localeCompare(b.report_title),
      }, {
        title: 'Preset Name',
        dataIndex: 'preset_name',
        width: '64%',
        sorter: (a, b) => a.preset_name.localeCompare(b.preset_name),
      }, {

        //   title: 'Column Name',
        //   dataIndex: 'columnNamesArr',
        //   width: '52%',
        //   sorter: (a, b) => a.columnNames.localeCompare(b.columnNames),
        //   render: (record, row) => record.map((item, i) => (<Tag color="blue" key={i}>{item}</Tag>))
        // }, {
        title: 'Action',
        align: 'center',
        width: '10%',
        render: (record, row) =>
          <ScreenLoader active={st.deleteLoader[row.id]} inline={true} tip="Loading...">
            <button title="Edit" className="btnToLink" onClick={() => SaveArrLocalStorage(row.id, 'reportingColumnPresets')}><i className="fs-18 las la-edit link-color" /></button>
            <i className="list_view_icon_sap las la-redo"></i>

            <Popconfirm
              title={'Are you sure to delete this preset?'}
              onConfirm={() => this.deletePreset(row.id)}
              okText="Yes"
              cancelText="No"
            >
              <button title="Delete" className="btnToLink"><i className="fs-18 las la-times-circle link-color" /></button>
            </Popconfirm>
          </ScreenLoader>
      }];
    return (
      <div>
        <PageTitle
          titleIcon="las la-th-list"
          titleSpan="Column Preset"
          titleHeading="Log"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-folder-open', label: 'Report' },
            { iconLas: 'las la-table', label: 'Column Presets' },
            { iconLas: 'las la-th-list', label: 'Column Presets Log' }
          ]}
        />
        <div className="container report-preset-container">
          <ScreenLoader active={st.loader}>
            <DataTable
              columns={columns}
              styleType={2}
              dataSource={st.data}
              showSizeChanger={true}
              pagination={{ itemDetails: true, showOnSinglePage: true }}
              customFilter="true"
              customFilterLabel="Filter by"
              customFilterCol={[
                { label: 'Preset Name', value: 'preset_name' },
                { label: 'Report Title', value: 'report_title' },
                { label: 'Column Names', value: 'columnNames' }
              ]}
              expandedRowRender={record =>
                <Row guter={window.rowGutter}>
                  <Col lg={3} md={3} sm={3} xs={24}>
                    <b className="col-name-label-in-table">Column Names:</b>
                  </Col>
                  <Col lg={21} md={21} sm={21} xs={24}>
                    {record.columnNamesArr.map((item, i) => (<Tag color="blue" key={i} style={{ marginTop: '2px', marginBottom: '2px', marginRight: '4px' }}>{item}</Tag>))}
                  </Col>
                </Row>
              }
            />
          </ScreenLoader>
        </div>
      </div>
    );//End return
  }//End render
  componentDidMount() {
    this.setState({ loader: true });
    HTTP('get', '/reporting/get/getColumnPresetList').then(res => {
      this.setState({ loader: false });
      if (!res) { return false; }
      this.setState({ data: res.data });
    });
  }//End componentDidMount
}//End Class

export default ColumnPresetLog;