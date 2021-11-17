import React from 'react';
import GooseLogo from './img/goose-logo.svg';
import ArkmoonLogo from './img/arkmoon-logo.svg';
import AstroMan from './img/astroman.jpg';
import Form from './components/form/Form';
import NavIcon from './components/nav/NavIcon';
import Loading from './components/loading/Loading';

function App() {
  function handleGetStarted() {
    return function(e) {
      e && e?.preventDefault();
      setShowForm(true);
      document.getElementById('address-form') && document.getElementById('address-form').focus();
    };
  }

  // Local State.
  const [showForm, setShowForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Ref for loader.
  const loadingRef = React.createRef();

  return (
    <div className="bg-gray-100">
      {
        (isLoading)
          ? (
            <Loading loadingRef={loadingRef} />
          )
          : null
      }

      <section className="min-h-screen pt-20 relative" style={{backgroundColor: '#1d0d23'}}>
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-top text-white">
          <div className="md:w-1/2 justify-center min-h-screen">
            <img className="w-auto max-h-screen mx-auto" src={AstroMan} />
          </div>
          <div className="overflow-visible md:w-1/2">
            <div className={`flip ${(showForm) ? 'show-back' : ''}`}>
              <div className="flip-content">
                <div className="flip-front filter drop-shadow px-16 md:px-4 flex justify-center items-center h-full">
                  <div>
                    <h1 className="text-5xl font-bold leading-tight">
                    ARK Income Estimator
                    </h1>
                    <p className="leading-normal text-2xl mb-8">
                    Figuring out how much you owe in crypto taxes is tedious. Let us help by calculating how much income you&rsquo;ve earned from ARK staking rewards.
                    </p>
                    <a
                      href="#address-form"
                      className=" hidden md:block max-w-max text-center mx-auto lg:mx-0 hover:underline focus:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                      onClick={handleGetStarted('address-form')}
                    >
                      Get Started
                    </a>
                  </div>
                </div>
                <div className="flip-back">
                  <Form
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="fixed right-4 bottom-4">
        <div className="mx-auto h-16 md:h-20">
          <div className="float-right flex items-center justify-between">
            <div className="flex justify-end content-center">
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
      </nav>

      <footer className="text-center py-12">
        <p><sup>*</sup>This software does not constitute formal tax advice. For educational purposes only.</p>
        <p>&copy; 2021 Delegate Goose and Delegate ArkMoon</p>
      </footer>
    </div>
  );
}

export default App;
