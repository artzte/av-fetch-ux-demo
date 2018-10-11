import React, { Component } from 'react';
import FetchContainer from './FetchContainer';

class App extends Component {
  render() {
    return (
      <div>
        <aside>
          <header className="text-center pad-left-md pad-top-md">
            <h1>Fetch Example</h1>
          </header>
        </aside>
        <FetchContainer />
      </div>
    );
  }
}

export default App;
