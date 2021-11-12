import React from 'react';

function DatatablePage(columns, rows) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto w-full">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            className="
              shadow
              border-b border-gray-200
              sm:rounded-lg
              overflow-hidden
            "
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {
                    columns?.map((column, i) => (
                      <th
                        scope="col"
                        className="
                          px-6
                          py-3
                          text-left text-xs
                          font-medium
                          text-gray-500
                          uppercase
                          tracking-wider
                        "
                        key={`header-${column?.field}-${i}`}
                      >
                        {column?.label || ''}
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  rows?.map((row, i) => (
                    <tr className={(i % 2 === 0) ? 'bg-gray-50' : ''}key={`row-${i}`}>
                      {
                        // Output the row in the same order that the columns were declared.
                        columns?.map((column) => (
                          <td className="px-6 py-4 whitespace-nowrap" key={`cell-${column?.field}-${i}`}>
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {row[column?.field]}
                                </div>
                              </div>
                            </div>
                          </td>

                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatatablePage;
