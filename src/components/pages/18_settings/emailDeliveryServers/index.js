import React, { useEffect, useState } from 'react';
import { Row, Col, Tooltip, Popconfirm, Descriptions } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import PageTitle from '../../mutual/pageTitle';
import DataTable from '../../../externalComponents/andt-data-table-component';
import ScreenLoader from '../../../externalComponents/screen-loader';
import DeliveryServerSideWidget from './partial/sideWidget';
import AddDeliveryServerModal from './partial/addDeliveryServerModal';
import { HTTP, LogResetList, LogResetRow, DeleteRowFromList, SortableDateInTableData, AccessControl } from '../../../services';
import '../styles.less';

const EmailDeliveryServers = () => {
  const [getLoader, setGetLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState({});
  const [data, setData] = useState([]);
  const [togglePassword, setTogglePassword] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [defaultLoader, setDefaultLoader] = useState({})

  const showFieldPassword = (id, status) => {
    togglePassword[id] = status;
    setTogglePassword({ ...togglePassword });
  }//End function

  useEffect(() => {
    setGetLoader(true);
    HTTP('get', '/settingsEmailDeliveryServers/get/getList/').then(res => {
      setGetLoader(false);
      if (!res) return false;
      setData(res.data);
    });
  }, [])

  const deleteServer = (row) => {
    // let loader = {};
    deleteLoader[row.id] = true;
    setDeleteLoader({ ...deleteLoader });
    HTTP('post', '/settingsEmailDeliveryServers/post/deleteServer/', { id: row.id }).then(res => {
      deleteLoader[row.id] = false;
      setDeleteLoader({ ...deleteLoader });
      if (!res) return false;
      setData(DeleteRowFromList(data, row.id));
    });
  }//End function

  const makeDefaultDS = (row) => {
    defaultLoader[row.id] = true;
    setDefaultLoader({ ...defaultLoader });
    HTTP('post', '/settingsEmailDeliveryServers/post/makeDefaultDS', { id: row.id }).then(res => {
      defaultLoader[row.id] = false;
      setDefaultLoader({ ...defaultLoader });
      if (!res) return false;
      //@ Updating Status on Front-End
      let dt = [...data];
      let newData = [];
      dt.forEach(el => {
        el['default_status'] = '';
        if (el.id === row.id) { el['default_status'] = 'true'; }
        newData.push(el);
      });
      setData(newData);
    });
  }//End function

  const column = [{
    title: '',
    dataIndex: 'default_status',
    width: '4%',
    render: (a, row) =>
      <div>
        {a === 'true' ?
          <Tooltip title="Default DS" color={'#48a64f'} placement="left">
            <i className="las la-check-circle fs-26 success-color" />
          </Tooltip>
          :
          AccessControl(168) &&
          <ScreenLoader active={defaultLoader[row.id]} emptyLabel={true} inline={true}>
            <Tooltip title="Click to make it default DS" color={'#1286e5'} placement="left">
              <Popconfirm
                title={'Are you sure to make it default'}
                onConfirm={() => makeDefaultDS(row)}
                okText="Yes"
                cancelText="No"
              >
                <button className="btnToLink"><i className="las la-check-circle fs-26 lite-color" /></button>
              </Popconfirm>
            </Tooltip>
          </ScreenLoader>
        }
      </div>
  }, {
    title: 'Sr',
    dataIndex: 'key',
    width: '4%',
    sorter: (a, b) => a.key - b.key,
  }, {
    title: 'Server Name',
    dataIndex: 'name',
    width: '30%',
    sorter: (a, b) => a.name.localeCompare(b.name)
  }, {
    title: 'Host',
    dataIndex: 'host',
    width: '20%',
    sorter: (a, b) => a.host.localeCompare(b.host)
  }, {
    //   title: 'Username',
    //   dataIndex: 'username',
    //   width: '22%',
    //   sorter: (a, b) => a.username.localeCompare(b.username)
    // }, {
    //   title: 'Password',
    //   dataIndex: 'password',
    //   width: '18%',
    //   sorter: (a, b) => a.password.localeCompare(b.password),
    //   render: (a, b) =>
    //     <div className="flex-sb-m">
    //       <div>{togglePassword[b.id] ? a : '****'}</div>
    //       <div><button className="btnToLink link-color fs-14" onClick={() => showFieldPassword(b.id, !togglePassword[b.id])}>{togglePassword[b.id] ? <EyeInvisibleOutlined /> : <EyeOutlined />}</button></div>
    //     </div>
    // }, {
    //   title: 'Port #',
    //   dataIndex: 'port',
    //   width: '10%',
    //   sorter: (a, b) => a.port.localeCompare(b.port)
    // }, {
    title: 'SMTP Secure',
    dataIndex: 'smtp_secure',
    width: '12%',
    sorter: (a, b) => a.smtp_secure.localeCompare(b.smtp_secure),
    render: (a) => <span>{a.toUpperCase()}</span>
  }, {
    title: 'Inserted Date',
    dataIndex: 'inserted_date_formatted',
    width: '20%',
    sorter: SortableDateInTableData('inserted_date_formatted'),
  }];

  AccessControl('166,167') &&
    column.push({
      title: 'Action',
      align: 'center',
      width: '10%',
      render: (record, row) =>
        <ScreenLoader inline={true} active={deleteLoader[row.id]} tip='Loading'>
          <div className="text-center">
            {AccessControl(167) &&
              <>
                {row.default_status === 'true' ?
                  <button className="btnToLink" title="Can not delete Default server"><i className="fs-18 las la-ban link-color link-color"></i></button>
                  :
                  <Popconfirm
                    title="Are you sure to delete this server?"
                    onConfirm={() => deleteServer(row)}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                    placement="topRight"
                  >
                    <button className="btnToLink" ><i className="fs-18 las la-times-circle link-color"></i></button>
                  </Popconfirm>
                }
              </>
            }
            {AccessControl(166) &&
              <>
                &nbsp;<i className="list_view_icon_sap las la-redo" />&nbsp;
                <button className="btnToLink" onClick={() => { setEditId(row.id); setShowEditModal(true) }}><i className="fs-18 las la-edit link-color"></i></button>
              </>
            }
          </div>
        </ScreenLoader>
    });

  return (
    <div className="setting-container">
      <PageTitle
        titleIcon="las la-envelope"
        titleSpan="Email SMTP"
        titleHeading="Delivery Servers"
        titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
        breadcrumb={[
          { iconLas: 'las la-cog', label: 'Settings' },
          { iconLas: 'las la-envelope', label: 'Email Delivery Servers' }
        ]}
      />
      {/* <hr className="hr-3"/> */}
      <Row gutter={window.rowGutter}>
        {AccessControl(165) &&
          <Col lg={19} md={19} sm={24} xs={24}>
            <div className="container">
              <ScreenLoader active={getLoader}>
                <DataTable
                  columns={column}
                  styleType={2}
                  dataSource={data}
                  showSizeChanger={true}
                  sizeChangerOptions={[5, 10, 15, 20, 30, 40, 50, 100]}
                  pagination={{ itemDetails: true, showOnSinglePage: true }}
                  // label={<span><i className="las la-envelope" /> <span className="fw-400">Email</span> <strong>Delivery Servers</strong></span>}
                  // desc="Use lists to organize separate groups of subscribers."
                  filterLabel="Filter data"
                  customFilter="true"
                  customFilterLabel="Filter by"
                  customFilterCol={[
                    { label: 'Server Name', value: 'name' },
                    { label: 'Username', value: 'username' },
                    { label: 'Password', value: 'password' },
                    { label: 'SMTP Secure', value: 'smtp_secure' }
                  ]}
                  expandedRowRender={(record) => {
                    return (<div className="container">
                      <div className="description-custom">
                        <Descriptions size="small" layout='vertical' className={`three-col-vertical`} bordered column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }}>
                          <Descriptions.Item label="Username">{record.username}</Descriptions.Item>
                          <Descriptions.Item label="Password">
                            <div className="flex-sb-m">
                              <div>{togglePassword[record.id] ? record.password : '****'}</div>
                              <div><button className="btnToLink link-color fs-14" onClick={() => showFieldPassword(record.id, !togglePassword[record.id])}>{togglePassword[record.id] ? <EyeInvisibleOutlined /> : <EyeOutlined />}</button></div>
                            </div>
                          </Descriptions.Item>
                          <Descriptions.Item label="Port">{record.port}</Descriptions.Item>
                        </Descriptions>
                      </div>
                    </div>)//End return
                  }}
                  rowExpandable={(record) => record.host}
                />
              </ScreenLoader>
            </div>
            <AddDeliveryServerModal
              show={showEditModal}
              editId={editId}
              onClose={() => {
                setShowEditModal(false);
                setEditId(null)
              }}
              updateData={(e) => setData(LogResetRow(e, data))}
            />
          </Col>
        }
        <Col lg={5} md={5} sm={24} xs={24}>
          <DeliveryServerSideWidget addData={(e) => setData(LogResetList(e, data))} showSectionByArr={[1, 3]} />
        </Col>
      </Row>
    </div>
  )//End return
}//End function
export default EmailDeliveryServers;