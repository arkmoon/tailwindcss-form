import React from 'react';
import { useTable, usePagination } from 'react-table';
import { fileOutput } from './FileOutput';

function DatatablePage(cols = [], rowsData = [], title = '') {
  const columns = React.useMemo(() => (
    cols.map((col) => ({
      Header: col.label,
      accessor: col.field,
    }))
  ), []);

  const data = React.useMemo(() => (rowsData), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 50 },
    },
    usePagination
  );

  return (
    <>
      <div
        className="
          border-b
          overflow-y-auto
          shadow
          sm:rounded-lg
        border-gray-200
        "
      >
        <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup?.key} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    key={column?.id}
                    {...column.getHeaderProps()}
                    className="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row?.id} {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td className="px-6 py-4 whitespace-nowrap" key={cell?.id}
                        {...cell.getCellProps()}
                      >
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {cell.render('Cell')}
                            </div>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between">

        {
          <button className="rounded-lg bg-yellow-400 text-gray-800 font-bold my-4 p-4 uppercase border-yellow-500 border mt-4" onClick={fileOutput(title, cols, rowsData)}>
            Download {title} CSV
          </button>
        }

        <div className="flex text-gray-700 my-2">
          {
            (pageCount > 1)
              ? (
                <button
                  className="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer disabled:opacity-50"
                  disabled={!canPreviousPage}
                  onClick={() => previousPage()}
                >
                  <span className="sr-only">Previous Page</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left w-6 h-6">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              )
              : null
          }
          <div className="flex h-12 font-medium rounded-lg items-center px-4 bg-gray-200">
            <span className="sr-only">Data table showing rows </span>{
              pageIndex * pageSize + 1
            } - {
              (data.length > (pageIndex * pageSize + pageSize))
                ? (pageIndex * pageSize + pageSize)
                : (data.length)
            } of {data.length} <span className="sr-only">total rows</span>
          </div>

          {
            (pageCount > 1)
              ? (
                <button
                  className="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer disabled:opacity-50"
                  disabled={!canNextPage}
                  onClick={() => nextPage()}
                >
                  <span className="sr-only">Next Page</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right w-6 h-6">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              )
              : null
          }
        </div>
      </div>
    </>
  );
}

export default DatatablePage;
