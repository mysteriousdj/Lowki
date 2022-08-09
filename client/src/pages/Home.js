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
          className="col-12 col-md-12 mb-3 p-3 bg-light"
          style={{ border: '1px dotted #1a1a1a', borderRadius: "12px"}}
        >
          <RantForm />
        </div>
        <div className="col-12 col-md-12 mb-3 pt-3 bg-light" style={{borderRadius: "12px", width: "100%"}}>
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
