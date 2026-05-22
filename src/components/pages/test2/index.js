import React, { Component } from 'react';
import Select from 'react-select';




class Test2 extends Component {
  render() {
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];

    return (
      <div>

        <div className="App">
          <Select
            defaultValue={''}
            // onChange={setSelectedOption}
            options={options}
            isMulti={true}
          />
        </div>

      </div>
    );
  }
}//End class
export default Test2;