import React from 'react';
import PropTypes from 'prop-types';
import {
  useFieldArray,
  Controller,
  useFormContext,
} from 'react-hook-form';

function FieldArray({
  displayName = '',
  id = '',
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
    if (inputField) {
      append({ value: inputField });
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
      <div className="flex flex-col mb-16">
        <div className="flex items-center pt-2 pb-4">
          <input
            aria-label={`Add a ${displayName}`}
            className="
              appearance-none
              w-full
            text-gray-900
              mr-3
              p-2
              rounded
              leading-tight
            "
            key={id}
            id={id}
            maxLength="34"
            name={id}
            onChange={handleNewFieldChange}
            ref={addNewRef}
            type="text"
            value={inputField}
          />

          <button
            className="flex-shrink-0 text-sm bg-yellow-300 text-purple-dark shadow p-2 rounded font-bold"
            type="button"
            onClick={addNew}>
              + Add<span className="sr-only"> {displayName}</span>
          </button>
        </div>

        {
          (fields && fields?.length)
            ? (
              <ul className="rounded bg-white text-gray-900 pl-4 leading-tight">
                {
                  (
                    fields.map((item, index) => (
                      <Controller
                        key={item.id}
                        name={`${id}.${index}.value`}
                        control={control}
                        defaultValue={item.value}
                        render={({ field }) => (
                          <div className="flex items-center">
                            <li className="w-10/12 truncate" key={`${id}.${index}.value`}>
                              {
                                field?.value || ''
                              }
                            </li>

                            <button
                              className="p-2 w-2/12"
                              type="button"
                              onClick={removeField(index)}
                            >
                              <span>x<span className="sr-only"> remove {displayName}</span></span>
                            </button>
                          </div>
                        )}>
                      </Controller>
                    ))
                  )
                }
              </ul>
            )
            : null
        }
      </div>
    </>
  );
}

FieldArray.propTypes = {
  displayName: PropTypes.string,
  id: PropTypes.string,
};

export default FieldArray;
