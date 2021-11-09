import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FeatherLogo from './img/feather.png';
import Form from './components/form/Form';

export default function App() {
  const methods = useForm();

  return (
    <div>
      <div className="relative min-h-screen grid bg-black ">
        <div
          className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
          <div
            className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-center relative"
            style={{backgroundImage: `url(${FeatherLogo})`}}>
            <div className="absolute bg-black opacity-25 inset-0 z-0" />
            <div className="w-full lg:max-w-2xl md:max-w-md z-10 items-center text-center ">
              <div className=" font-bold leading-tight mb-6 mx-auto w-full content-center items-center ">
              </div>
            </div>
          </div>
          <FormProvider {...methods}>
            <Form />
          </FormProvider>
        </div>
      </div>
      <footer className="text-center py-12">
        <p><sup>*</sup>This software does not constitute formal tax advice. For educational purposes only.</p>
        <p>&copy; 2021 Goose and ArkMoon</p>
      </footer>
    </div>
  );
}
