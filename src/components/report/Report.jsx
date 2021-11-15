import React from 'react';
import PropTypes from 'prop-types';
import DatatablePage from './DatatablePage';
import { fileOutput } from './FileOutput';
import Alert from '../alert/Alert';
import { columnLabels, scrollTo } from '../../common/utils';
import { useLocation } from 'react-router';


import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';
import { Link } from 'react-router-dom';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);



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
        <h2 className="text-2xl my-4" id={title} tabIndex="-1">{title}</h2>
        {
          DatatablePage(columns, rows)
        }

        {
          /**
           * @todo: Pagination.
           */
        }

        {
          // (rows?.length > 40)
          //   ? (
          //     <div className="flex items-center space-x-1 mt-4 float-right">
          //       <a href="#" className="flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md">
          //         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          //         </svg>
          //       </a>
          //       <a href="#" className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
          //         1
          //       </a>
          //       <a href="#" className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
          //         2
          //       </a>
          //       <a href="#" className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white">
          //         3
          //       </a>
          //       <a href="#" className="px-4 py-2 text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white">
          //         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          //         </svg>
          //       </a>
          //     </div>
          //   )
          //   : null
        }

        {
          <button className="bg-yellow-300 text-purple-dark shadow font-bold uppercase p-4 my-4" onClick={fileOutput(title, columns, rows)}>
            Download {title} CSV
          </button>
        }
      </React.Fragment>
    );
  }

  function scrollDownToTable(hash) {
    return function(e) {
      e && e.preventDefault();
      scrollTo(hash);
    };
  }

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

  for (const key of keys) {
    tables.push(dataTable(key, results[key]));
  }

  return (
    <>
      {
        tables.length
          ? (
            <div className="flex flex-row flex-wrap flex-1 flex-grow w-full pt-24">
              <nav className="flex items-center justify-between flex-wrap bg-purple p-6 fixed w-full z-10 top-0">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                  <Link className="hover:underline focus:underline text-white" to="/">
                    <span className="text-2xl pl-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 float-left" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                      </svg> Go back home</span>
                  </Link>
                </div>
                <div className="block lg:hidden">
                  <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                  </button>
                </div>
                <div className="w-full flex-grow lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content">
                  <ul className="list-reset lg:flex justify-end flex-1 items-center">
                    {
                      keys.map((key) => (
                        <li className="mr-3" key={`results-nav-${key}`}>
                          <Link className="hover:underline focus:underline inline-block py-2 px-4 text-white" to={`#${key}`} state={location.state} onClick={scrollDownToTable(key)}>
                            <span className="sr-only">View </span>{key}<span className="sr-only"> results table</span>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </nav>

              {/*Graph Content */}
              <div id="main-content" className="container mx-auto">
                <div className="p-3">
                  {
                    tables
                  }
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
    </>
  );
}

Report.propTypes = {
  results: PropTypes.object,
};

export default Report;
