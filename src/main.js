import React from 'react';

const Cam=() => {
  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={() => window.open('http://localhost:5000', '_blank')}>[url 링크]</button>
      <a id="download"></a>
    </div>
  );
};

export default Cam;