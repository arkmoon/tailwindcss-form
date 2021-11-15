import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Alert from '../alert/Alert';
import Report from '../report/Report';
import HouseIcon from '../../img/icon-house.svg';
import CrossIcon from '../../img/icon-cross.svg';
import FlagIcon from '../../img/icon-flag.svg';
import FieldArray from './FieldArray';

function Form() {
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

          // // Display the results.
          // setResults(response?.data);

          // // Scroll to results.
          // scrollTo('results-tables');
        } else {
          setError(
            <Alert />
          );
          setResults(null);

          // Scroll to error.
          scrollTo('results-error');
        }
      }).catch((e) => {
        console.error(e);
        setError(
          <Alert />
        );
        setResults(null);

        // Scroll to error.
        scrollTo('results-error');
      });
    }
  }

  // Local state for results.
  const [results, setResults] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

  // React Hook Forms.
  const methods = useForm();

  // Ref for loader.
  const loadingRef = React.createRef();

  // React Router.
  let navigate = useNavigate();

  React.useEffect(() => {
    if (loadingRef && loadingRef.current) {
      loadingRef.current.focus();
    }
  }, [isLoading]);

  return (
    <section className="text-gray-800 w-full lg:w-3/5 mx-auto">
      <form
        id="address-form"
        onSubmit={methods.handleSubmit(handleOnSubmit)}
        tabIndex="-1"
      >
        {
          error
        }

        {
          results
            ? (
              <section className="bg-white w-full" id="results-tables">
                <div className="container mx-auto">
                  <Report results={results} />
                </div>
              </section>
            )
            : null
        }

        <FormProvider {...methods}>

          {
            (isLoading)
              ? (
                <div ref={loadingRef} tabIndex="-1">
                  <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-black opacity-90 flex flex-col items-center justify-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
                    <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
                    <p className="w-1/3 text-center text-white">This may take a few seconds, please don&apos;t close this page.</p>
                  </div>
                </div>
              )
              : (
                <div className="container px-5 py-16 md:py-4 w-full mx-auto">
                  <div className="flex flex-wrap">
                    <div className="md:pr-10 md:py-6 w-full">
                      <div className="flex relative pb-12">
                        <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                          <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-white relative z-10 bg-purple">
                          <img className="w-5 h-5" src={HouseIcon} alt="house icon" aria-hidden="true" />
                        </div>
                        <div className="flex-grow pl-4">
                          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 1</h2>
                          <p className="leading-relaxed">Add your ARK addresses.</p>
                          <FieldArray
                            displayName="ARK Address"
                            id="addresses"
                          />
                        </div>
                      </div>
                      <div className="flex relative pb-12">
                        <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                          <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-white relative z-10 bg-purple">
                          <img className="w-5 h-5" src={CrossIcon} alt="cross icon" aria-hidden="true" />
                        </div>
                        <div className="flex-grow pl-4">
                          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 2</h2>
                          <p className="leading-relaxed">Add any excluded transactions that you might not want to count as income.</p>
                          <FieldArray
                            displayName="Excluded Transaction"
                            id="exceptions"
                          />
                        </div>
                      </div>
                      <div className="flex relative pb-12">
                        <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                          <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-white relative z-10 bg-purple">
                          <img className="w-5 h-5" src={FlagIcon} alt="flag icon" aria-hidden="true" />
                        </div>
                        <div className="flex-grow pl-4">
                          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">FINISH</h2>
                          <p className="leading-relaxed">Submit your data and see how much income was made.</p>
                          <button className="bg-yellow-300 text-purple-dark shadow font-bold uppercase text-lg mx-auto p-4 w-full mt-8" type="submit">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
          }
        </FormProvider>

      </form>
    </section>
  );
}

Form.propTypes = {
  handleOnSubmit: PropTypes.func,
};

export default Form;
