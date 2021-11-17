import React from 'react';
import PropTypes from 'prop-types';

function Loading({
  loadingRef,
}) {
  // Focus the first time this loads.
  React.useEffect(() => {
    if (loadingRef && loadingRef.current) {
      loadingRef.current.focus();
    }
  }, []);

  return (
    <div ref={loadingRef} tabIndex="-1" className="z-50">
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden bg-black opacity-90 flex flex-col items-center justify-center z-50">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
        <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
        <p className="w-1/3 text-center text-white">This may take a few seconds, please don&apos;t close this page.</p>
      </div>
    </div>
  );
}

Loading.propTypes = {
  loadingRef: PropTypes.object,
};

export default Loading;
