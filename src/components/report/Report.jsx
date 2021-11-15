import React from 'react';
import PropTypes from 'prop-types';
import DatatablePage from './DatatablePage';
import { fileOutput } from './FileOutput';
import Alert from '../alert/Alert';
import { columnLabels } from '../../common/utils';
import { useLocation } from 'react-router';

function Report() {
  function dataTable(title, data) {
    const columns = (data?.columns && data?.columns?.length)
      ? (
        data?.columns.map((column) => {
          return ({
            label: columnLabels(column),
            field: column,
          });
        })
      )
      : [];

    const rows = (data?.data && data?.data?.length)
      ? (
        data?.data?.map((row) => {
          let result = {};

          // Grab the headers for keys.
          for(let i = 0, len = data?.columns.length; i < len; i++) {
            result[data?.columns[i]] = row[i];
          }

          return result;
        })
      )
      : []
    ;

    return (
      <React.Fragment key={title}>
        <h2 className="text-xl mt-8">{title}</h2>
        {
          DatatablePage(columns, rows)
        }
        {
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded" onClick={fileOutput(title, columns, rows)}>
            Download {title} CSV
          </button>
        }
        <hr />
      </React.Fragment>
    );
  }

  // React Router.
  let location = useLocation();
  let results = location.state?.results || {};

  let tables = [];

  const keys = [
    'Summary',
    'Buys',
    'Sells',
    '8949'  ,
  ];

  for (const key of keys) {
    tables.push(dataTable(key, results[key]));
  }

  if (tables.length > 0) {
    // Add reset button and disclaimer.
    tables.unshift(<p key="disclaimer"><sup>*</sup>Market Values based on End of Day CryptoCompare prices.</p>);
  }

  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-3xl">
            Report
        </h2>
      </div>
      <div className="container mx-auto">
        {
          (tables.length > 0)
            ? (
              tables
            )
            : (
              <div className="container mx-auto">
                <Alert />
              </div>
            )
        }
      </div>
    </>
  );
}

Report.propTypes = {
  results: PropTypes.object,
};

export default Report;
