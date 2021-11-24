import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Alert from '../alert/Alert';
import HouseIcon from '../../img/icon-house.svg';
import CrossIcon from '../../img/icon-cross.svg';
import FlagIcon from '../../img/icon-flag.svg';
import FieldArray from './FieldArray';

function Form({
  isLoading = false,
  setIsLoading = () => {},
}) {
  function handleOnSubmit(data) {
    const addresses = (data?.addresses && data?.addresses?.length) ? data?.addresses?.filter(({value}) => value).map(({value}) => value) : [];
    const exceptions = (data?.exceptions && data?.exceptions?.length) ? data?.exceptions?.filter(({value}) => value).map(({value}) => value) : [];

    // Environment Variables.
    const network = import.meta.env.VITE_NETWORK;
    const submissionUrl = import.meta.env.VITE_SUBMIT_URL;

    // Ensure they have at least 1 address.
    if (addresses.length) {
      // Start loading.
      setIsLoading(true);

      axios.post(`${submissionUrl}`, {
        addresses,
        exceptions,
        network,
      }).then((response) => {
        if (
          response?.status === 200
          && response?.data
          && !response?.data?.Error
        ) {
          // Clear the error if any.
          setError(null);

          // Stop loading.
          setIsLoading(false);

          // Go to the Results page.
          navigate('/report', { state: {results: response?.data || {} }});

          // Scroll back up if they haven't.
          window.scrollTo(0, 0);
        } else {
          setError(
            <Alert />
          );
          // Scroll to error.
          scrollTo('results-error');
        }
      }).catch((e) => {
        console.error(e);
        setError(
          <Alert />
        );

        setIsLoading(false);

        // Scroll to error.
        scrollTo('results-error');
      });
    }
  }

  function triggerTooltip(index) {
    return async function(e) {
      e && e?.preventDefault();
      await setToolTips({
        ...toolTips,
        [index]: !toolTips[index]
      });

      // Focus on the new region.
      if (!toolTips[index]) {
        refArr[index - 1].current.focus();
      }
    };
  }

  // Local state for results.
  const [error, setError] = React.useState();
  const [toolTips, setToolTips] = React.useState({
    1: false,
    2: false,
    3: false,
  });

  const refArr = [
    React.useRef(),
    React.useRef(),
    React.useRef(),
  ];

  // React Hook Forms.
  const methods = useForm();

  // React Router.
  let navigate = useNavigate();

  return (
    <form
      className="rounded-xl p-8"
      id="address-form"
      onSubmit={methods.handleSubmit(handleOnSubmit)}
      tabIndex="-1"
    >
      {
        error
      }
      <FormProvider {...methods}>
        {
          (!isLoading)
            ?  (
              <div>
                <div className="flex flex-wrap text-left">
                  <div className="md:pr-10 md:pt-10 w-full">
                    <div className="flex relative">
                      <div className="hidden md:flex h-full w-10 absolute inset-0 items-center justify-center">
                        <div className="h-full w-1 bg-gray-100 pointer-events-none" />
                      </div>
                      <div className="hidden md:inline-flex flex-shrink-0 w-10 h-10 rounded-full items-center justify-center text-white relative z-10 bg-gray-100">
                        <img className="w-5 h-5" src={HouseIcon} alt="house icon" aria-hidden="true" />
                      </div>
                      <div className="flex-grow md:pl-4 md:mb-16">
                        <div className="float-left">
                          <div className="relative flex flex-col items-left group float-left" aria-hidden="true">
                            <a href="#0" aria-expanded={toolTips[1]} aria-controls="tooltip-1" onClick={triggerTooltip(1)}>
                              <span className="sr-only">Show tooltip for step 1</span>
                              <svg className="w-5 h-5 mt-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                              </svg>
                            </a>
                            <div className={`focus:outline-none focus:underline absolute bottom-0 flex flex-col items-center mb-6 group-hover:flex ${(toolTips[1]) ? '' : 'hidden'}`} id="tooltip-1" role="region" tabIndex="-1" ref={refArr[0]}>
                              <span className="relative z-10 p-2 text-white bg-black shadow-lg w-tooltip rounded-lg border-2 border-white font-mono text-xs">Add one or multiple Ark addresses to calculate estimated income / taxes. Delegate addresses are currently not supported.</span>
                              <div className="w-3 h-3 -mt-2 rotate-45 bg-black" />
                            </div>
                          </div>
                        </div>
                        <h2 className="float-left font-medium title-font text-gray-100 mb-1 tracking-wider leading-normal">
                          STEP 1
                        </h2>

                        <p className="leading-relaxed clear-left">Add your addresses. At least 1 is required.</p>
                        <FieldArray
                          displayName="ARK Address"
                          id="addresses"
                          maxLength={34}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="flex relative">
                      <div className="hidden md:flex h-full w-10 absolute inset-0 items-center justify-center">
                        <div className="h-full w-1 bg-gray-100 pointer-events-none" />
                      </div>
                      <div className="hidden md:inline-flex flex-shrink-0 w-10 h-10 rounded-full items-center justify-center text-white relative z-10 bg-gray-100">
                        <img className="w-5 h-5" src={CrossIcon} alt="house icon" aria-hidden="true" />
                      </div>
                      <div className="flex-grow md:pl-4 md:mb-16">
                        <div className="float-left">
                          <div className="relative flex flex-col items-left group float-left" aria-hidden="true">
                            <a href="#0" aria-expanded={toolTips[2]} aria-controls="tooltip-2" onClick={triggerTooltip(2)}>
                              <span className="sr-only">Show tooltip for step 2</span>
                              <svg className="w-5 h-5 mt-1 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                              </svg>
                            </a>
                            <div className={`focus:outline-none focus:underline absolute bottom-0 flex flex-col items-center mb-6 group-hover:flex ${(toolTips[2]) ? '' : 'hidden'}`} id="tooltip-2" role="region" tabIndex="-1" ref={refArr[1]}>
                              <span className="relative z-10 p-2 text-white bg-black shadow-lg w-tooltip rounded-lg border-2 border-white font-mono text-xs">Excluded transactions are those you would like to exclude for calculation purposes. For example you sent funds to an exchange and immediately withdrew without trading. This would prevent transactions from looking like buys/sales or income as appropriate.</span>
                              <div className="w-3 h-3 -mt-2 rotate-45 bg-black" />
                            </div>
                          </div>
                        </div>
                        <h2 className="float-left font-medium title-font text-gray-100 mb-1 tracking-wider leading-normal">
                          STEP 2
                        </h2>
                        <p className="leading-relaxed clear-left">Enter transaction IDs you want to exclude (optional).</p>
                        <FieldArray
                          displayName="Excluded Transaction"
                          id="exceptions"
                          maxLength={64}
                        />
                      </div>
                    </div>
                    <div className="flex relative">
                      <div className="hidden md:flex h-full w-10 absolute inset-0 items-center justify-center">
                        <div className="h-full w-1 bg-gray-100 pointer-events-none" />
                      </div>
                      <div className="hidden md:inline-flex flex-shrink-0 w-10 h-10 rounded-full items-center justify-center text-white relative z-10 bg-gray-100">
                        <img className="w-5 h-5" src={FlagIcon} alt="flag icon" aria-hidden="true" />
                      </div>
                      <div className="flex-grow md:pl-4 md:mb-16">

                        <h2 className="font-medium title-font text-gray-100 mb-1 tracking-wider leading-normal">
                          <span>FINISH</span>
                        </h2>
                        <p className="leading-relaxed clear-left">Submit to calculate how much income was made.</p>

                        <div className="flex mb-16 w-full pr-4">
                          <button className="rounded-lg bg-yellow-400 text-gray-800 font-bold p-4 uppercase border-yellow-500 border mt-4 w-full" type="submit">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            : null
        }
      </FormProvider>

    </form>
  );
}

Form.propTypes = {
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
};

export default Form;
