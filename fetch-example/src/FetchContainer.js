import React, { Component } from 'react';
import get from './Get';

function SuccessResult(successResult) {
  return (
    <div>
      <h2>Success</h2>
      <p>{successResult.hello}</p>
    </div>
  );
}

function ErrorResult(errorResult) {
  const message = (errorResult.response && errorResult.response.error) || errorResult.message;
  return (
    <div className='error'>
      <h2>Error</h2>
      <s-box>
        <p>Fetch response status: {errorResult.status}</p>
        <p>Fetch response status text: {errorResult.statusText}</p>
        <p>Response body message or caught error: {message}</p>
      </s-box>
    </div>
  );
}

function LoadingResult() {
  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
}

class FetchContainer extends Component {
  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search.substr(1));
    const url = searchParams.get('result') || 'success';

    this.setState((state) => {
      return {
        loading: true,
      };
    });

    get(`/api/${url}`)
      .then((result) => {
        this.setState(() => {
          return {
            result: result,
            errorResult: null,
          };
        });
      }, (error) => {
        this.setState(() => {
          return {
            result: null,
            errorResult: error,
          };
        });
      })
      .finally(() => {
        this.setState((state) => {
          return {
            loading: false,
          };
        });

        this.render();
      });
  }

  render() {
    const state = this.state || {};
    let { result, errorResult } = state;
    let showResult;

    if (result) {
      showResult = SuccessResult(result);
    } else if (errorResult) {
      showResult = ErrorResult(errorResult);
    } else {
      showResult = LoadingResult()
    }

    return (
      <main className="pad-all-md">
        {showResult}
      </main>
    );
  }
}

export default FetchContainer;
