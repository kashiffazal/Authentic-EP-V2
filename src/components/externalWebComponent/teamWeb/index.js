import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { HTTP } from '../../services';
import ScreenLoader from '../../externalComponents/screen-loader';

// import './style.less';

class TeamWeb extends Component {
	state = {
		loader: false,
		listData: []
	}
	render() {
		const data = this.state.listData;
		return (
			<div className="teamBoxContainer">
				<ScreenLoader active={this.state.loader}>
					{this.state.loader && <div className="h-200"></div>}
					<Row gutter={30} type="flex" justify="center" align="top">
						{data.map((item, i) => {
							return (
								<React.Fragment>
									<Col lg={12} md={24} sm={24} xs={24} key={i}>
										<Row className="teamSideBySite">
											<Col lg={10} md={6} sm={8} xs={24}> 
												<img className="teamImg" src={item.profileImg} width="100%" alt="" />
											</Col>
											<Col lg={14} md={18} sm={16} xs={24} >
												<div className="teamSideSection">
													<div className="teamPosition">{item.teamPosition}</div>
													<div className="teamName">{item.name}</div>
													{/* <div className="teamCountry"><span>Country:</span> {item.bornCountry}</div> */}
													<div className="teamLanguages"><span>Languages spoken:</span> {item.otherLanguageSpeak}</div>
													{item.aboutExperience && <div className="teamExp">{item.aboutExperience}</div>}
													{item.description && <div className="teamDesc">{item.description}</div>}
												</div>
											</Col>
										</Row>
									</Col>
								</React.Fragment>
							);
						})}


					</Row>
				</ScreenLoader>
			</div>
		);//End return
	}//End render
	componentWillMount() {
		this.setState({ loader: true });
		HTTP('get', '/team/get/listForWeb/se/ig').then(res => {
			this.setState({ loader: false });
			if (!res) return false;
			//console.log(res);
			this.setState({ listData: res.data });
		});
	}//End componentWillMount
}//End class

export default TeamWeb;