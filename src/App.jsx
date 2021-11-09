import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FeatherLogo from './img/feather.png';

export default function App() {
  function onSubmit(data) {
    console.log('data', data);

    const {
      addresses,
      exceptions,
      network,
    } = data;

    axios.post(`${submissionUrl}`, {
      addresses: [...addresses || ''],
      exceptions: [...exceptions || ''],
      network: network || '',
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    });
  }

  // Environment variable for submission.
  const submissionUrl = import.meta.env.VITE_SUBMIT_URL;
  const { register, handleSubmit, formState: { errors } } = useForm();

  if (Object.keys(errors).length > 0) {
    console.error('Clientside form errors: ', errors);
  }

  return (
    <div>
      <div className="relative min-h-screen grid bg-black ">
        <div
          className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
          <div
            className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-center relative"
            style={{backgroundImage: `url(${FeatherLogo})`}}>
            <div className="absolute bg-black  opacity-25 inset-0 z-0" />
            <div className="w-full lg:max-w-2xl md:max-w-md z-10 items-center text-center ">
              <div className=" font-bold leading-tight mb-6 mx-auto w-full content-center items-center ">
              </div>
            </div>
          </div>
          <div
            className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">
            <div className="max-w-xl w-full">
              <div className="lg:text-left text-center">
                <div className="flex items-center justify-center ">
                  <div className="bg-black flex flex-col w-80 border border-gray-900 rounded-lg px-8 py-10">
                    <form className="flex flex-col mt-2" onSubmit={handleSubmit(onSubmit)}>
                      <label className="font-bold text-lg text-white ">Public Key</label>
                      <input
                        className="border rounded-lg py-3 px-3 mt-2 mb-8 bg-black border-white placeholder-white-500 text-white"
                        id="addresses"
                        maxLength="70"
                        placeholder="Public Key"
                        type="text"
                        {...register('addresses', {required: true, maxLength: 70})}
                      />
                      {
                        (errors?.id === 'blah')
                          ? (
                            <p className="text-red-500 text-xs italic">Blah is required.</p>
                          )
                          : null
                      }

                      <label className="font-bold text-lg text-white ">Excluded Transaction</label>
                      <input
                        className="border rounded-lg py-3 px-3 mt-2 mb-8 bg-black border-white placeholder-white-500 text-white"
                        id="exceptions"
                        placeholder="Excluded Transaction"
                        maxLength="70"
                        type="text"
                        {...register('exceptions', {maxLength: 70})}
                      />
                      {
                        (errors?.id === 'blah')
                          ? (
                            <p className="text-red-500 text-xs italic">Blah is required.</p>
                          )
                          : null
                      }

                      <label className="font-bold text-lg text-white ">Network</label>
                      <input
                        className="border rounded-lg py-3 px-3 mt-2 mb-8 bg-black border-white placeholder-white-500 text-white"
                        id="network"
                        placeholder="Network"
                        maxLength="50"
                        type="text"
                        {...register('network', {required: true, maxLength: 50})}
                      />
                      {
                        (errors?.id === 'blah')
                          ? (
                            <p className="text-red-500 text-xs italic">Blah is required.</p>
                          )
                          : null
                      }

                      <button
                        className="border border-white bg-black text-white rounded-lg py-3 mt-2 mb-2 font-semibold"
                      >Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
