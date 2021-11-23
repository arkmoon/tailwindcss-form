import React from 'react';
import PropTypes from 'prop-types';
import DatatablePage from './DatatablePage';
import Alert from '../alert/Alert';
import { columnLabels } from '../../common/utils';
import { useLocation } from 'react-router';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';

function Report() {
  function dataTable(title, data, index) {
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
      <div key={title} style={{display: (activeTab === index) ? 'block' : 'none'}}>
        {
          DatatablePage(columns, rows, title)
        }
      </div>
    );
  }

  function handleActiveTab(index) {
    return function() {
      setActiveTab(index);
    };
  }

  // Local State.
  const [activeTab, setActiveTab] = React.useState(0);

  // React Router.
  let location = useLocation();
  let results = location.state?.results || {};

  let tables = [];

  const keys = [
    'Summary',
    'Buys',
    'Sells',
    '8949',
  ];

  let countTables = 0;

  for (const key of keys) {
    tables.push(dataTable(key, results[key], countTables++));
  }

  const classes = {
    active: 'text-gray-100 py-4 px-6 block hover:underline focus:underline border-b-2 font-medium border-white',
    inactive: 'text-gray-100 py-4 px-6 block hover:underline focus:underline',
  };

  return (
    <>
      <h1 className="sr-only">Report</h1>
      <div className="flex flex-wrap place-items-top">
        <section className="relative mx-auto">
          <nav className="flex justify-between bg-gray-900 text-white mb-8 rounded-b-lg">
            <div className="px-5 xl:px-12 py-2 flex w-full items-center">
              <ul className="md:flex px-4 font-semibold font-heading space-x-12">
                <li>
                  <Link to="/" className="hover:text-gray-200 hover:underline focus:underline">
                    Go back home
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </section>
      </div>

      {
        tables.length
          ? (
            <div className="min-h-screen">
              <div className="flex flex-row flex-wrap flex-1 flex-grow w-full">
                <nav className="flex flex-col sm:flex-row mx-auto">
                  <button className={classes[(activeTab === 0) ? 'active' : 'inactive']} onClick={handleActiveTab(0)}>
                    Summary
                  </button>
                  <button className={classes[(activeTab === 1) ? 'active' : 'inactive']} onClick={handleActiveTab(1)}>
                    Buys
                  </button>
                  <button className={classes[(activeTab === 2) ? 'active' : 'inactive']} onClick={handleActiveTab(2)}>
                    Sells
                  </button>
                  <button className={classes[(activeTab === 3) ? 'active' : 'inactive']} onClick={handleActiveTab(3)}>
                    8949
                  </button>
                </nav>

                <div id="main-content" className="container mx-auto">
                  <div className="p-3">
                    {
                      tables
                    }
                  </div>
                </div>
              </div>
            </div>
          )
          : (
            <div className="container mx-auto">
              <Alert />
            </div>
          )
      }

      <div className="w-full bg-gray-900 text-gray-100">
        <Footer />
      </div>
    </>
  );
}

Report.propTypes = {
  results: PropTypes.object,
};

export default Report;
