import React, { Component } from 'react'
import PageTitle from '../../mutual/pageTitle';
import { LoadArrLocalStorage } from '../../../services';
import PlainingForm from './form';

class PlainingFormPage extends Component {
	state = {
		shift_no: ''
	}
	render() {
		// console.log(this.props.match.params.id)
		const st = this.state;
		return (
			<div>
				<PageTitle
					titleIcon="las la-chalkboard-teacher"
					titleSpan="Service Plaining"
					titleHeading="Form"
					titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
					breadcrumb={[
						{ iconLas: 'las la-chalkboard-teacher', label: 'Service Plaining' }
					]}
					breadcrumbWithRender={st.shift_no &&
						<div className="formNumber"><span>Form #</span>{st.shift_no}</div>
					}
				/>
				<PlainingForm id={this.props.match.params.id ? LoadArrLocalStorage(this.props.match.params.id) : ''} setShiftNumber={(e) => this.setState({ shift_no: e })} />
			</div>
		)//End return
	}//End render

}//End class
export default PlainingFormPage;