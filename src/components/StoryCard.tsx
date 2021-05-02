import React from 'react';
import { useHistory } from 'react-router-dom';

import bookmarkAdd from '../img/bookwhite.png';
import bookmarkRemove from '../img/bookblack.png';
import { useGlobalContex } from '../context/GlobalContext';
import { Story } from '../types/interfaces';
import { useState } from 'react';

const StoryCard = ({
  story,
  hideButton,
}: {
  story: Story;
  hideButton: boolean;
}) => {
  const history = useHistory();
  const { state, dispatch } = useGlobalContex();
  const bookmarked = state.bookmark.stories.find(
    (el) => el.id === story.id
  )
    ? true
    : false;
  const [click, setClick] = useState(bookmarked);

  return (
    <div className="stories__container">
      <div
        className="stories__info"
        onClick={() => {
          history.push(`/stories/${story.id}`);
        }}
      >
        <h3>Story ID #{story.id}</h3>
        <p>{story.title}</p>
      </div>
      <div className="stories__bookmark">
        <div className="characters__bookmark">
          {click === false ? (
            <img
              src={bookmarkAdd}
              alt="bookmarkAdd"
              aria-label="bookmarkAdd"
              onClick={() => {
                dispatch({
                  type: 'SET_BOOKMARK_STORY',
                  payload: { bookmarkStory: story },
                });
                setClick(true);
              }}
            />
          ) : (
            <img
              src={bookmarkRemove}
              alt="bookmarkRemove"
              aria-label="bookmarkRemove"
              onClick={() => {
                dispatch({
                  type: 'REMOVE_BOOKMARK',
                  payload: {
                    removeBookmark: {
                      type: 'STORY',
                      id: story.id,
                    },
                  },
                });
                setClick(false);
              }}
            />
          )}
          {hideButton === true ? (
            <></>
          ) : (
            <button
              type="button"
              className="comics__hide"
              onClick={() => {
                dispatch({
                  type: 'HIDE_RESOURCE',
                  payload: {
                    hideResource: {
                      type: 'STORY',
                      id: story.id,
                    },
                  },
                });
              }}
            >
              hide
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
