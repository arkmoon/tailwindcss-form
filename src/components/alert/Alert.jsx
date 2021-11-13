import React from 'react';
import PropTypes from 'prop-types';

function Alert({
  message = 'Your search resulted in zero results.',
  style = 'danger',
  title = 'No data found',
}) {
  const alertColor = {
    danger: ['bg-red-500', 'text-red-100', 'border-red-500', 'bg-red-100', 'text-red-700'],
    success: ['bg-green-500', 'text-green-100', 'border-green-500', 'bg-green-100', 'text-green-700'],
    warning: ['bg-yellow-500', 'text-yellow-100', 'border-yellow-500', 'bg-yellow-100', 'text-yellow-700'],
  };

  return (
    <div className="container mx-auto" id="results-error" role="alert" tabIndex="-1">
      <div className={`${alertColor[style][0]} ${alertColor[style][1]} font-bold rounded-t px-4 py-2`}>
        <h2>{ title }</h2>
      </div>
      <div className={`border border-t-0 rounded-b  px-4 py-3 ${alertColor[style][2]} ${alertColor[style][3]} ${alertColor[style][4]}`}>
        <p>{message}</p>
      </div>
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string,
  style: PropTypes.string,
  title: PropTypes.bool,
};

export default Alert;
