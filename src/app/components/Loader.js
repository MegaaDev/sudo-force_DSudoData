import React from 'react';

function Loader() {
  return (
    <div>
      <div class='spinner-loading'></div>
      <h2 className='text-white'>Uploading to IPFS</h2>
    </div>
  );
}

export default Loader;
