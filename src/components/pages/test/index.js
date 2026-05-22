import React, { Component } from 'react'
import './styles.less';

class Test extends Component {
  state = {
    // elements: document.querySelectorAll('.element'),
    hasCollision: false,
    offset: [0, 0]
  }//End state

  allowDrop = (ev) => { ev.preventDefault(); }
  drag = (ev) => { ev.dataTransfer.setData("text", ev.target.id); }
  drop = (ev) => {ev.preventDefault(); var data = ev.dataTransfer.getData("text"); if (!this.state.hasCollision) { try { ev.target.appendChild(document.getElementById(data)); } catch (err) { } }}//End function
  dragMove = (e) => { this.setState({ elements: document.querySelectorAll('.element') }, () => { this.setState({ hasCollision: Array.prototype.some.call(this.state.elements, d => { if (d.id !== e.target.id) { return this.isCollide(e, d); } return false }) }) }) }//End function
  isCollide = (a, b) => {const bRect = b.getBoundingClientRect();return !(((a.clientY + this.state.offset[1]) < (bRect.top)) || (a.clientY + this.state.offset[1] > (bRect.top + bRect.height)) || ((a.clientX + this.state.offset[0]) < bRect.left) || (a.clientX + this.state.offset[0] > (bRect.left + bRect.width)))}

  // isCollide = (a, b) => {
  //   const aRect = a.target.getBoundingClientRect()
  //   const bRect = b.getBoundingClientRect()
  //   return !(
  //     ((a.clientY + this.state.offset[1] + aRect.height) < (bRect.top)) ||
  //     (a.clientY + this.state.offset[1] > (bRect.top + bRect.height)) ||
  //     ((a.clientX + this.state.offset[0] + aRect.width) < bRect.left) ||
  //     (a.clientX + this.state.offset[0] > (bRect.left + bRect.width))
  //   )
  // }

  render() {
    return (
      <div>
        <div>
          <div id="div1" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}>
            <img alt="" src="https://ix-www.imgix.net/logos/homepage-logos-wall.ai?page=1&fm=png8&bg=ffffff&ixlib=imgixjs-3.5.1&w=182" draggable="true"
              onDragStart={(e) => this.drag(e)}
              onDrag={(e) => this.dragMove(e)}
              id="drag1" className="element"
              width="88" height="31" />

          </div>
          <div id="div2" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}>
            <img alt="" src="https://web-dev.imgix.net/image/admin/ACrLFM1rLlaY2fzUTeXl.jpg" draggable="true"
              onDragStart={(e) => this.drag(e)}
              onDrag={(e) => this.dragMove(e)}
              id="drag2" className="element"
              width="88" height="31" />
          </div>

          <div id="div3" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}></div>
          <div id="div4" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}></div>
          <div id="div5" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}></div>
          <div id="div6" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}></div>
          <div id="div7" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}></div>
        </div>
        <div>
          <div id="div8" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}></div>
          <div id="div9" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}></div>
          <div id="div10" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}></div>
          <div id="div11" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}></div>
          <div id="div12" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}></div>
          <div id="div13" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}></div>
          <div id="div14" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}></div>
        </div>












      </div>
    )//End return
  }//End render

  componentDidMount() {
    this.setState({ elements: document.querySelectorAll('.element') })
  }
}//End class
export default Test;