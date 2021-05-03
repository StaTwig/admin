import React from 'react';

const Spinner = () => {
  return <div className="loader">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
}

export default Spinner;