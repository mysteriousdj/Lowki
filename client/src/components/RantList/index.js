import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const RantList = ({
  rants,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  if (!rants.length) {
    return <h3>No rants Yet</h3>;
  }
  

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {rants &&
        rants.map((rant) => (
          <div key={rant._id} className="card mb-3 pb-2">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/rants/${rant._id}`}
                >
                  <span styles={{fontSize: '2.5rem'}}>
                  {rant.rantAuthor} <br /> 
                  <span style={{fontSize: '1rem'}}>
                    Company:{rant.company} <br />
                  <span style={{ fontSize: '0.85rem' }}>
                     had this rant on {rant.createdAt}
                  </span>
                  </span>
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this rant on {rant.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{rant.rantText}</p>
            </div>
            <section className='d-flex flex-row' style={{justifyContent: "space-between"}}>
              <div className="voting ml-3">
                <button onClick={() => setDownVote(downVote + 1)} className="bg-light" style={{border: "0", borderRadius: "6px", cursor: 'pointer'}} type= "button" data-placement= "top" title= "Dislike">
                  <i className='fa-regular fa-thumbs-down m-2'></i>
                </button>
                <p id="input1" >{downVote}
                </p>
                <button onClick={() => setUpVote(upVote + 1)} className="bg-light" style={{border: "0", borderRadius: "6px", cursor: 'pointer'}} type= "button" data-placement= "top" title= "like">
                  <i className='fa-solid fa-thumbs-up m-2'></i>
                </button>
                <p id="input2">{upVote}</p>
              </div>
            <Link
              className="btn btn-primary btn-squared mr-3"
              to={`/rants/${rant._id}`}
              style={{borderRadius: "12px", maxHeight: "38px"}}
            >
              Comment
            </Link>
            </section>
          </div>
          
        ))}
    </div>
    
  );
};

export default RantList;
