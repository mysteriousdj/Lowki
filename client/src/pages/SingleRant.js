import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_RANT} from '../utils/queries';

const SingleRant = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { rantId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_RANT, {
    // pass URL parameter
    variables: { rantId: rantId },
  });

  const rant = data?.rant || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {rant.rantAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this rant on {rant.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {rant.rantText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={rant.comments} />
      </div>
      <div className=" p-4 bg-light" style={{ border: '1px dotted #1a1a1a', borderRadius: "12px" }}>
        <CommentForm rantId={rant._id} />
      </div>
    </div>
  );
};

export default SingleRant;
