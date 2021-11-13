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
  isRequired = false,
}) {
  const {
    clearErrors,
    control,
    formState: { errors },
    setError,
  } = useFormContext(); // retrieve all hook methods

  const {
    append,
    fields,
    remove,
  } = useFieldArray({
    control,
    name: id,
  });

  React.useEffect(() => {
    if (fields.length === 0) {
      append({ value: '' });
    }
  });

  return (
    <>
      <div className="flex flex-col mb-4">
        {
          fields.map((item, index) => (
            <Controller
              key={item.id}
              name={`${id}.${index}.value`}
              control={control}
              defaultValue={item.value}
              render={({ field }) => (
                <>
                  <label className="mt-8 mb-2 font-bold text-lg" htmlFor={`${displayName}_${index}`}>{displayName} #{index + 1}</label>

                  <div className="flex">
                    <input
                      className="border rounded-lg py-2 px-3 w-4/5"
                      id={`${displayName}_${index}`}
                      maxLength="100"
                      name={`${displayName}_${index}`}
                      type="text"
                      {...field}
                    />
                    <button
                      className="w-1/5"
                      onClick={() => {
                        if (fields.length > 1) {
                          remove(index);
                          if (isRequired) {
                            clearErrors(id);
                          }
                        } else {
                          if (isRequired) {
                            setError(id, { type: 'required', message: `At least one ${displayName} is required.`});
                          }
                          remove(index);
                          append({ value: '' });
                        }
                      }}
                    >Delete</button>
                  </div>
                  {errors[id] && <p>{errors[id].message}</p>}
                </>
              )}>
            </Controller>
          ))
        }
      </div>
      <button
        className="float-right pr-5"
        type="button"
        onClick={() => {
          append({ value: '' });
          clearErrors(id);
        }}>
        + Add another {displayName}
      </button>
      <div className="clear-right" />
    </>
  );
}

FieldArray.propTypes = {
  displayName: PropTypes.string,
  id: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default FieldArray;
