import React from 'react';
import ReactDOM from 'react-dom';
import DemoComp from 'src/index';
import props from '../mockData/index';


ReactDOM.render(<DemoComp {...props} />, document.getElementById('app'));
