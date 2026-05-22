defaultProps = {
    onChange: null
    loadTimeOffset: 5,
    lazyRadius: 0,
    brushRadius: 1,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 300,
    canvasHeight: 180,
    disabled: false,
    imgSrc: "",
    saveData: null,//Use for load data (drawing lines not an image)
    immediateLoading: false,
    hideInterface: false,
    gridSizeX: 25,
    gridSizeY: 25,
    gridLineWidth: 0.5,
    hideGridX: false,
    hideGridY: false
    enablePanAndZoom: false,
    mouseZoomFactor: 0.01,
    zoomExtents: { min: 0.33, max: 3 },
  };
  
  //For Load current value on Next and Previous btn
  name="referralSign"
  currentValue={fv.referralSign}
