import React from 'react';
import { useFormContext } from 'react-hook-form';
import FieldArray from './FieldArray';
import axios from 'axios';

export default function Form() {
  function handleOnSubmit(data) {
    const {
      addresses = [],
      exceptions = [],
      network = '',
    } = data;

    const submissionUrl = import.meta.env.VITE_SUBMIT_URL;
    const network = import.meta.env.VITE_NETWORK;

    axios.post(`${submissionUrl}`, {
      addresses: addresses?.filter(({value}) => value).map(({value}) => value),
      exceptions: exceptions?.filter(({value}) => value).map(({value}) => value),
      '${network}',
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    });
  }

  const {
    handleSubmit,
    register,
  } = useFormContext();

  return (
    <div className="flex justify-center items-center w-full align-middle h-full">
      <div className="w-1/2 bg-black text-white rounded shadow-2xl p-8 m-4">
        <h1 className="block w-full text-center text-2xl font-bold mb-6">DPoS Income Estimator</h1>
        <form
          onSubmit={handleSubmit((data) => handleOnSubmit(data))}
        >
          <FieldArray
            displayName="Public Key"
            id="addresses"
            isRequired={true}
          />

          <FieldArray
            displayName="Excluded Transaction"
            id="exceptions"
            isRequired={false}
          />

          <button className="border rounded-lg text-white bg-black font-bold uppercase text-lg mx-auto p-4 w-full mt-8" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
