/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRanger } from "react-ranger";
import './styles.less';

export const Segment = styled("div")`
  background: ${props => props.color[props.index]};
  height: 100%;
`;

export const Handle = styled("div")`
  background: #ff1a6b;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 100%;
  font-size: 0.7rem;
  white-space: nowrap;
  color: white;
  font-weight: ${props => (props.active ? "bold" : "normal")};
  transform: ${props =>
    props.active ? "translateY(-100%) scale(1.3)" : "translateY(0) scale(0.9)"};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

// useEffect(() => {
//   setProfileState(props);
// }, [props]);

const MultiRangeSlider = (props) => {
  const [values, setValues] = useState(props.data.widthArr);
  useEffect(() => {
    props.onChange(values);
  }, [values]);

  const { getTrackProps, ticks, segments, handles } = useRanger({
    min: 0,
    max: 100,
    stepSize: 1,
    values,
    onDrag: setValues
  });

  return (
    <div className="App">
      <div className="track" {...getTrackProps()}>
        {ticks.map(({ value, getTickProps }) => (
          <div className="tick" {...getTickProps()}>
            <div className="tickLabel">{value}</div>
          </div>
        ))}
        {segments.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps({color : props.data.colorArr})} index={i} />
        ))}
        {handles.map(({ value, active, getHandleProps }, k) => (
          <button
            {...getHandleProps({
              style: {
                appearance: "none",
                border: "none",
                background: "transparent",
                outline: "none"
              }
            })}
          >
            <Handle active={active}>
              {k === 0 ? value : (value - handles[k - 1].value)}
            </Handle>
          </button>
        ))}
      </div>
      {/* {JSON.stringify(handles)} */}
      {/* <hr />
      {JSON.stringify({ values })} */}
    </div>
  );
}

export default MultiRangeSlider;