import React from 'react';

import './App.css';
import Container from './Container';
import { After, Before, Regular } from './Elements';

const App = () => (
  <div className="App">
    <Container
      list={Array.from(new Array(100000).keys()).map(index => (
        <Regular key={index}>Item: {index}</Regular>
      ))}
      itemSize={50}
      before={<Before>Before</Before>}
      beforeSize={70}
      after={<After>After</After>}
      afterSize={100}
    />
  </div>
);

export default App;
