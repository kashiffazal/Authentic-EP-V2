<RichTextEditor
  height = '480' //default
  menubar={false} // default is false
  toolType={1} // default is 0
  
  ///////// Status Bar ////////////
  statusbar={false} // default is true
  resize={fase | both} (both = vertical and horizontal) // default is false
  elementpath={false}, // p > strong > etc... // default is true


  value="<p>This is the initial content of the editor.</p>"
  onChange={(e) => console.log(e)}
/>