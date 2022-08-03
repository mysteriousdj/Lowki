import React from 'react';
import { useQuery } from '@apollo/client';

import RantList from '../components/RantList';
import RantForm from '../components/RantForm';

import { QUERY_RANTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RANTS);
  const rants = data?.rants || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <RantForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <RantList
              rants={rants}
              title="Some Feed for Rant(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
