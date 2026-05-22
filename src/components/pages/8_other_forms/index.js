import React, { Component } from 'react';
import PageTitle from '../mutual/pageTitle';

class Overview extends Component {
  render() {
    return (
      <div>
        <PageTitle
          titleIcon="las la-cubes"
          titleSpan="Inventory"
          titleHeading="Adjustment"
          titleDesc="Use lists to organize separate groups of subscribers e.g. customers and staffs."
          breadcrumb={[
            { iconLas: 'las la-boxes', label: 'Others' },
            { iconLas: 'las la-cubes', label: 'Inventory Adjustment' }
          ]}
        />
        <div className="container">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    )//End Return statement
  }//end End Render
}//End class

export default Overview;
