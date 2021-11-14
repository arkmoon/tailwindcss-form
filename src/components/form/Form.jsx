import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import HouseIcon from '../../img/icon-house.svg';
import CrossIcon from '../../img/icon-cross.svg';
import FlagIcon from '../../img/icon-flag.svg';
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
        id="address-form"
        onSubmit={handleSubmit((data) => handleOnSubmit(data))}
        tabIndex="-1"
      >
        <div className="container px-5 py-16 md:py-4 mx-auto flex flex-wrap">
          <div className="flex flex-wrap w-full">
            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-white relative z-10" style={{backgroundColor: '#1d0d23'}}>
                  <img className="w-5 h-5" src={HouseIcon} alt="house icon" aria-hidden="true" />
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-white relative z-10" style={{backgroundColor: '#1d0d23'}}>
                  <img className="w-5 h-5" src={CrossIcon} alt="cross icon" aria-hidden="true" />
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
                <div className="flex-shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-white relative z-10" style={{backgroundColor: '#1d0d23'}}>
                  <img className="w-5 h-5" src={FlagIcon} alt="flag icon" aria-hidden="true" />
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
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden p-4">
                    <h3 className="text-xl font-semibold">Addresses</h3>
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

                            {
                              (currentFormValues?.exceptions.length)
                                ? (
                                  <>
                                    <h3 className="text-xl font-semibold mt-4">Excluded Transactions</h3>
                                    <ul>
                                      {
                                        currentFormValues?.exceptions.map((exception, i) => (
                                          <li key={`exception_${i}`}>{exception?.value || ''}</li>
                                        ))
                                      }
                                    </ul>
                                  </>
                                )
                                : null
                            }
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
