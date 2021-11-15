import React from 'react';
import PropTypes from 'prop-types';

function NavIcon({
  altText = '',
  logo = '',
  url = '',
}) {

  // Nav classes for icons.
  const navImageClasses = `
    duration-300
    ease-in-out
    flex
    h-16
    w-16
    hover:scale-125
    hover:text-underline
    items-center
    justify-center
    m-2
    md:h-20
    md:w-20
    p-2
    rounded-full
    text-center
    transform
  `;

  return (
    <a
      className={navImageClasses}
      href={url}
      rel="noreferrer"
      style={{backgroundColor: '#500b37'}}
      target="_blank"
    >
      <img
        src={logo}
        alt={altText}
      />
    </a>
  );
}

NavIcon.propTypes = {
  altText: PropTypes.string,
  logo: PropTypes.string,
  url: PropTypes.string,
};

export default NavIcon;
