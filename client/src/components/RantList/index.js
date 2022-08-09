import React from 'react';
import { Link } from 'react-router-dom';

const RantList = ({
  rants,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!rants.length) {
    return <h3>No rants Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {rants &&
        rants.map((rant) => (
          <div key={rant._id} className="card mb-3">
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
              {/* <p>{rant.company}</p> */}
            </div>
            <section className='d-flex flex-row' style={{justifyContent: "space-between"}}>
              <div class="voting">
                <button type= "button" data-toggle= "tooltip" data-placement= "top" title= "Dislike" id="likebtn">
                  <i className='fa-regular fa-thumbs-down m-2'></i>
                </button>
                <input type= "number" id="input1" value= "0">
                </input>
                
                <button type= "button" data-toggle= "tooltip" data-placement= "top" title= "like" id="dislikebtn">
                  <i className='fa-solid fa-thumbs-up m-2'></i>
                </button>
                <input type= "number" id="input2" value= "0" ></input>
                  
                
                
              </div>

            <Link
              className="btn btn-primary btn-squared"
              to={`/rants/${rant._id}`}
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
