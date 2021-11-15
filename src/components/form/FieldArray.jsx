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
    formState: { errors },
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
      <div className="flex flex-col mb-4">
        <div className="flex items-center border-b border-blue-500 py-2">
          <input
            aria-label={`Add a ${displayName}`}
            className="
              appearance-none
              bg-transparent
              border-none
              w-full
            text-gray-700
              mr-3
              py-1
              px-2
              leading-tight
              focus:outline-none"
            key={id}
            id={id}
            name={id}
            onChange={handleNewFieldChange}
            ref={addNewRef}
            type="text"
            value={inputField}
          />

          <button
            className="flex-shrink-0 text-sm bg-yellow-300 text-purple-dark shadow py-1 px-2 rounded font-bold"
            type="button"
            onClick={addNew}>
              + Add<span className="sr-only"> {displayName}</span>
          </button>
        </div>

        {
          (fields && fields?.length)
            ? (
              fields.map((item, index) => (
                <Controller
                  key={item.id}
                  name={`${id}.${index}.value`}
                  control={control}
                  defaultValue={item.value}
                  render={({ field }) => (
                    <>
                      <div className="flex items-center py-2">
                        <input
                          aria-label={`${displayName} #${index + 1}`}
                          aria-describedby={`${displayName}-error-${index}`}
                          className="
                            appearance-none
                            bg-transparent
                            border-none
                            w-full
                          text-gray-700
                            mr-3
                            py-1
                            px-2
                            leading-tight
                            focus:outline-none"
                          key={`${id}.${index}.value`}
                          type="text"
                          {...field}
                        />
                        <button
                          className="flex-shrink-0 text-sm bg-white text-purple-dark py-1 px-2 font-bold"
                          type="button"
                          onClick={removeField(index)}
                        >
                          - Delete<span className="sr-only"> {displayName}</span>
                        </button>
                      </div>
                      {
                        (errors[id])
                          ? (
                            <p className="text-red-800" id={`${displayName}-error-${index}`}>Error: {errors[id].message}</p>
                          )
                          : null
                      }
                    </>
                  )}>
                </Controller>
              ))
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
