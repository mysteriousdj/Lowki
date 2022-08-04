import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_RANT } from '../../utils/mutations';
import { QUERY_RANTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const RantForm = () => {
  const [rantText, setRantText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addRant, { error }] = useMutation(ADD_RANT);
    

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addRant({
        variables: {
          rantText,
          rantAuthor: Auth.getProfile().data.username,
        },
      });

      setRantText('');
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'rantText' && value.length <= 280) {
      setRantText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Frustrated? Spill the Tea!</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="rantText"
                placeholder="Here's a new rant..."
                value={rantText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Rant
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your rants. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default RantForm;
