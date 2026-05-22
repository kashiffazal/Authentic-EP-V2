import React, { Component } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import './style.less';

class PageTitle extends Component {

  breadcrumbData = (data) => {
    return data && data.map((item, i) => {
      return (
        (item.link ?
          <Breadcrumb.Item href={`#/${window.urlpk}/${item.link}`} key={i}>
            {item.icon && item.icon}
            {item.iconLas && <i className={"pageTitleLasIcon " + item.iconLas} />}
            <span>{item.label}</span>
          </Breadcrumb.Item>
          :
          <Breadcrumb.Item key={i}>
            {item.icon && item.icon}
            {item.iconLas && <i className={"pageTitleLasIcon " + item.iconLas} />}
            <span>{item.label}</span>
          </Breadcrumb.Item>
        )//End item.link condition
      )//End return
    });
  }//End function


  render() {
    const data = this.props;
    const pr = this.props;
    const pageTitleSection = (
      <>
        <h3 className="pageTitle"><i className={data.titleIcon} /> <span>{data.titleSpan}</span> {data.titleHeading}</h3>
        <p className="fs-14">{data.titleDesc}</p>
      </>
    );
    return (
      <>
        {window.webviewMobile &&
          <div className={`pageTitleContainer page-title-mobile-fixed-bar ${pr.className ? pr.className : ''}`} id={this.props.idForMobile}>{pageTitleSection}</div>
        }

        <Row className="pageTitleContainer" type="flex" align="bottom">
          <Col lg={12} md={12} sm={24} xs={24}>{!window.webviewMobile && pageTitleSection}</Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            {data.breadcrumbWithRender ?
              <React.Fragment>
                <div className="renderContent">{this.props.breadcrumbWithRender}</div>
                <div className="breadcrumb">
                  <Breadcrumb>
                    <Breadcrumb.Item href={`#/${window.urlpk}/overview`}>
                      <HomeOutlined />
                    </Breadcrumb.Item>
                    {this.breadcrumbData(data.breadcrumb)}
                  </Breadcrumb>
                </div>
              </React.Fragment>
              :
              <React.Fragment>
                {(data.breadcrumb && data.breadcrumb.length > 0) &&
                  this.props.render ?
                  <div className="renderContent">{this.props.render}</div> :
                  data.breadcrumb && <div className="breadcrumb">
                    <Breadcrumb>
                      <Breadcrumb.Item href={`#/${window.urlpk}/overview`}>
                        <HomeOutlined />
                      </Breadcrumb.Item>
                      {this.breadcrumbData(data.breadcrumb)}
                    </Breadcrumb>
                  </div>
                }
              </React.Fragment>
            }
          </Col>
        </Row>
      </>
    );
  }
}

export default PageTitle;