import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import bookmarkAdd from '../img/bookwhite.png';
import bookmarkRemove from '../img/bookblack.png';
import { useGlobalContex } from '../context/GlobalContext';
import { Character } from '../types/interfaces';

const CharacterCard = ({
  character,
  hideButton,
}: {
  character: Character;
  hideButton: boolean;
}) => {
  const history = useHistory();
  const { state, dispatch } = useGlobalContex();
  const bookmarked = state.bookmark.characters.find(
    (el) => el.id === character.id
  )
    ? true
    : false;
  const [click, setClick] = useState(bookmarked);

  return (
    <div className="characters__container">
      <div className="characters__image">
        <img
          alt="character"
          onClick={() => {
            history.push(`/characters/${character.id}`);
          }}
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        />
        <div className="characters__id">{character.id}</div>
      </div>

      <div className="characters__info">
        <span>{character.name}</span>
        <div className="characters__bookmark">
          {click === false ? (
            <img
              src={bookmarkAdd}
              alt="bookmarkAdd"
              aria-label="bookmarkAdd"
              onClick={() => {
                dispatch({
                  type: 'SET_BOOKMARK_CHARACTER',
                  payload: { bookmarkCharacter: character },
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
                      type: 'CHARACTER',
                      id: character.id,
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
              className="characters__hide"
              onClick={() => {
                dispatch({
                  type: 'HIDE_RESOURCE',
                  payload: {
                    hideResource: {
                      type: 'CHARACTER',
                      id: character.id,
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

export default CharacterCard;
