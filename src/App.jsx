import React from 'react';
import GooseLogo from './img/goose-logo.svg';
import ArkmoonLogo from './img/arkmoon-logo.svg';
import HillsImg from './img/hills.svg';
import AstroMan from './img/astroman.jpg';
import Form from './components/form/Form';
import { scrollTo } from './common/utils';
import NavIcon from './components/nav/NavIcon';

export default function App() {
  function handleGetStarted(hash) {
    return function(e) {
      e && e?.preventDefault();
      scrollTo(hash);
    };
  }

  return (
    <>
      <div className="fixed right-4 bottom-4">
        <div className="mx-auto h-16 md:h-20">
          <div className="float-right flex items-center justify-between">
            <div className="flex w-full justify-end content-center">
              <NavIcon
                altText="Delegate Goose logo"
                logo={GooseLogo}
                url="https://arkdelegates.live/delegate/goose/contributions"
              />
              <NavIcon
                altText="Delegate arkmoon logo"
                logo={ArkmoonLogo}
                url="https://www.arkmoon.com"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="pt-20 relative" style={{backgroundColor: '#1d0d23'}}>
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center text-white">
          <div className="flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left">
            <h1 className="my-4 text-5xl font-bold leading-tight">
              ARK Income Estimator
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Figuring out how much you owe in crypto taxes is tedious. Let us help by calculating how much income you&rsquo;ve earned from ARK staking rewards.
            </p>
            <a
              href="#address-form"
              className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out z-50"
              onClick={handleGetStarted('address-form')}
            >
              Get Started
            </a>
          </div>
          <div className="w-full md:w-1/2 justify-center max-h-screen">
            <img className="w-auto max-h-screen mx-auto" src={AstroMan} />
          </div>
        </div>
        <img className="absolute bottom-0 w-full h-auto" src={HillsImg} alt="hills" />
      </section>

      <Form />

      <footer className="text-center py-12">
        <p><sup>*</sup>This software does not constitute formal tax advice. For educational purposes only.</p>
        <p>&copy; 2021 Delegate Goose and Delegate ArkMoon</p>
      </footer>
    </>
  );
}
