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

  // Local state for results.
  const [error, setError] = React.useState();

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
                        <h2 className="font-medium title-font text-gray-100 mb-1 tracking-wider leading-normal">STEP 1</h2>
                        <p className="leading-relaxed">Add your addresses. At least 1 is required.</p>
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
                        <h2 className="font-medium title-font text-gray-100 mb-1 tracking-wider leading-normal">STEP 2</h2>
                        <p className="leading-relaxed">Enter transaction IDs you want to exclude (optional).</p>
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
                        <h2 className="font-medium title-font text-gray-100 mb-1 tracking-wider leading-normal">FINISH</h2>
                        <p className="leading-relaxed">Submit to calculate how much income was made.</p>

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
