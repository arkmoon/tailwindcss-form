import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import FieldArray from './FieldArray';

function Form({
  handleOnSubmit = () => {},
}) {
  const {
    handleSubmit,
    getValues,
  } = useFormContext();

  const currentFormValues = getValues();

  return (
    <section className="text-gray-800 body-font">
      <form
        onSubmit={handleSubmit((data) => handleOnSubmit(data))}
      >
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap w-full">
            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 1</h2>
                  <p className="leading-relaxed">Add your ARK addresses.</p>
                  <FieldArray
                    displayName="Address"
                    id="addresses"
                    isRequired={true}
                  />
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 2</h2>
                  <p className="leading-relaxed">Add any excluded transactions that you might not want to count as income.</p>
                  <FieldArray
                    displayName="Excluded Transaction"
                    id="exceptions"
                    isRequired={false}
                  />
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                    <circle cx={12} cy={5} r={3} />
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3" />
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">FINISH</h2>
                  <p className="leading-relaxed">Submit your data and see how much income was made.</p>
                  <button className="border rounded-lg text-white bg-black font-bold uppercase text-lg mx-auto p-4 w-full mt-8" type="submit">Submit</button>
                </div>
              </div>

            </div>
            <div className="lg:w-3/5 md:w-1/2 md:pr-10 md:py-6">
              <div className="py-8">
                <div>
                  <h2 className="text-2xl font-semibold leading-tight">Your Pending Request</h2>
                </div>

                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <h3>Addresses</h3>
                    {
                      (currentFormValues?.addresses?.length)
                        ? (
                          <>
                            <ul>
                              {
                                currentFormValues?.addresses.map((address, i) => (
                                  <li key={`address_${i}`}>{address?.value || ''}</li>
                                ))
                              }
                            </ul>
                            <h3>Excluded Transactions</h3>
                            <ul>
                              {
                                currentFormValues?.exceptions.map((exception, i) => (
                                  <li key={`exception_${i}`}>{exception?.value || ''}</li>
                                ))
                              }
                            </ul>
                          </>
                        )
                        : (
                          <p>Please add an address to begin.</p>
                        )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

Form.propTypes = {
  handleOnSubmit: PropTypes.func,
};

export default Form;
