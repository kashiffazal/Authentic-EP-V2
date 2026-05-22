import React, { Component } from 'react'
// import SignatureCanvas from 'react-signature-canvas-react17-compatible';
import CanvasDraw from "react-canvas-draw";

// import SignatureCanvas from 'react-signature-canvas';

import './styles.less';

class SignCanvas extends Component {
  state = {
    loadImg: false
  }
  // sigPad = {}
  // trim = () => { this.props.onChange(this.sigPad.getTrimmedCanvas().toDataURL('image/png')); }//End function
  // onClear = () => { this.sigPad.clear(); this.props.onChange(''); }//end function
  onChange = (empty = false) => {
    var val = empty ? '' : (this.canvasRef && this.canvasRef.getDataURL());
    var loadableData = this.canvasRef && this.canvasRef.getSaveData();
    this.props.onChange && this.props.onChange(val, loadableData);
    empty && localStorage.setItem(this.props.name, false);
  }//End function
  render() {
    const pr = this.props;
    const width = (pr.width ? pr.width : 300);
    const height = (pr.height ? pr.height : 180);
    const defaultProps = {
      canvasWidth: width,
      canvasHeight: height,
      brushRadius: 1,
      lazyRadius: 0
    }
    const isBgImg = pr.props && pr.props.imgSrc ? pr.props.imgSrc : '';
    return (
      <div className="signPad" style={{ width: width, height: (height + 26), display: 'inline-block' }}>

        {!this.state.loadImg ?
          <React.Fragment>
            <div className="spb">
              <div>{pr.label && <label>{pr.label}:</label>}</div>
              <div>
                <button title="Erase" type="button" className="btnToLink link-color fs-18" onClick={() => { this.canvasRef.eraseAll(); this.onChange(true) }}><i className="las la-eraser" /></button>
                <button title="Undo" type="button" className="btnToLink link-color fs-18" onClick={() => this.canvasRef.undo()}><i className="las la-undo-alt" /></button>
                {pr.loadImg && <button title="Reset" className="btnToLink link-color fs-18" onClick={() => this.setState({ loadImg: pr.loadImg }, () => this.onChange(true))}><i className="las la-times-circle" /></button>}
              </div>
            </div>
            <CanvasDraw
              ref={e => (this.canvasRef = e)}
              {...defaultProps}
              {...pr.props}
              className="sigPad"
              onChange={() => {
                this.onChange();
                pr.name && localStorage.setItem(pr.name, this.canvasRef.getSaveData())
              }}
              saveData={pr.saveData ? pr.saveData : ''}
            />
          </React.Fragment>
          :
          <React.Fragment>
            <div className="spb">
              <div>{pr.label && <label>{pr.label}:</label>}</div>
              {!pr.disabled && <div>
                <button title="Undo" type="button" className="btnToLink link-color fs-12" onClick={() => this.setState({ loadImg: '' })}>Want to Edit?</button>
              </div>
              }
            </div>
            <div className="sigPad disabled">
              <img
                src={this.state.loadImg}
                alt=""
                style={isBgImg ? { backgroundImage: `url(${isBgImg})`, backgroundSize: 'contain' } : {}}
                // style={{marginTop : '5px'}}
                width={width - 4}
                height={height - 4}
              />
            </div>
          </React.Fragment>
        }

      </div>
    )//End return
  }//End render
  componentDidMount() {
    //If there is a name and current value then get value from local storage if it available
    let ls = (this.props.name && this.props.currentValue) ? localStorage.getItem(this.props.name) : false;
    if (ls && ls !== 'false') {
      this.canvasRef.loadSaveData(ls);
    } else {
      //Otherwise get load image
      if (this.props.loadImg) { this.setState({ loadImg: this.props.loadImg }); }//End if condition
    }//End if condition
  }//End componentDidMount
  componentDidUpdate(preProps) {
    if (preProps.loadImg !== this.props.loadImg) {
      this.setState({ loadImg: this.props.loadImg });
    }//End if condition
  }//End componentDidUpdate
}//End class
export default SignCanvas;