import React from 'react';
import PropTypes from 'prop-types';
import {
  useFieldArray,
  Controller,
  useFormContext,
} from 'react-hook-form';
import DeleteIcon from '../../img/icon-delete.svg';

function FieldArray({
  displayName = '',
  id = '',
  maxLength = 34,
}) {
  const {
    clearErrors,
    control,
  } = useFormContext(); // retrieve all hook methods

  const {
    append,
    fields,
    remove,
  } = useFieldArray({
    control,
    name: id,
  });

  function handleNewFieldChange(e) {
    setInputField(e?.target?.value || '');
  }

  function addNew() {
    let searchField;

    if (inputField) {
      searchField = fields?.find((field) => ((
        field?.value
        && inputField
        && field?.value?.toLowerCase() === inputField?.toLowerCase()
      )));

      if (!searchField) {
        append({ value: inputField });
      }

      clearErrors(id);
      setInputField('');
      addNewRef.current.focus();
    }
  }

  function removeField(index) {
    return function() {
      remove(index);
      clearErrors(id);
      addNewRef.current.focus();
    };
  }

  // Local State.
  const [inputField, setInputField] = React.useState('');

  const addNewRef = React.createRef();

  return (
    <>
      <div className="flex mb-4 w-full pr-4">
        <input
          aria-label={`Add a ${displayName}`}
          className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white w-full"
          id={id}
          key={id}
          maxLength={maxLength}
          name={id}
          onChange={handleNewFieldChange}
          ref={addNewRef}
          type="text"
          value={inputField}
        />
        <button
          className="rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r min-w-max"
          onClick={addNew}
          type="button"
        >
          Add<span className="sr-only"> {displayName}</span>
        </button>
      </div>
      {
        (fields && fields?.length)
          ? (
            <>
              <h2 className="sr-only">Your Addresses</h2>
              {
                fields.map((item, index) => (
                  <Controller
                    key={item.id}
                    name={`${id}.${index}.value`}
                    control={control}
                    defaultValue={item.value}
                    render={({ field }) => (
                      <div className="flex mb-2 w-full pr-4">
                        <input
                          aria-label={`Add a ${displayName}`}
                          className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white w-full"
                          maxLength={maxLength}
                          name={id}
                          type="text"
                          value={field?.value || ''}
                          {...field}
                        />
                        <button
                          className="rounded-r-lg bg-purple-dark  text-gray-800 font-bold p-4 uppercase border-purple-dark border-t border-b border-r min-w-max"
                          onClick={removeField(index)}
                        >
                          <img aria-hidden="true" className="w-5 h-5" src={DeleteIcon} alt="delete icon" />
                          <span className="sr-only"> remove {field?.value || ''}</span>
                        </button>
                      </div>
                    )}
                  />
                ))
              }
            </>
          )
          : null
      }
    </>
  );
}

FieldArray.propTypes = {
  displayName: PropTypes.string,
  id: PropTypes.string,
  maxLength: PropTypes.number,
};

export default FieldArray;
