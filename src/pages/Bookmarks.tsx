import CharacterCard from '../components/CharacterCard';
import ComicCard from '../components/ComicCard';
import StoryCard from '../components/StoryCard';
import { useGlobalContex } from '../context/GlobalContext';
import { Character, Comic, Story } from '../types/interfaces';

import '../styles/bookmark.scss';

const Bookmarks = () => {
  const { state, dispatch } = useGlobalContex();
  const { characters, comics, stories } = state.bookmark;
  const hideButton = true;

  return (
    <div>
      <div className="bookmark">
        <h1>BOOKMARKS</h1>
        {characters?.length === 0 &&
        comics?.length === 0 &&
        stories?.length === 0 ? (
          <> </>
        ) : (
          <button
            className="bookmark__delete-all"
            type="button"
            onClick={() => {
              dispatch({
                type: 'DELETE_ALL_BOOKMARKS',
              });
            }}
          >
            Delete All Bookmarks
          </button>
        )}
      </div>
      {characters?.length === 0 ? <> </> : <h2>CHARACTERS</h2>}
      <div className="characters">
        {characters?.map((character: Character) => {
          return (
            <CharacterCard
              key={character.id}
              character={character}
              hideButton={hideButton}
            />
          );
        })}
      </div>
      {comics?.length === 0 ? <> </> : <h2>COMICS</h2>}
      <div className="comics">
        {comics?.map((comic: Comic) => {
          return (
            <ComicCard key={comic.id} comic={comic} hideButton={hideButton} />
          );
        })}
      </div>
      {stories?.length === 0 ? <> </> : <h2>STORIES</h2>}
      <div className="stories">
        {stories?.map((story: Story) => {
          return (
            <StoryCard key={story.id} story={story} hideButton={hideButton} />
          );
        })}
      </div>
    </div>
  );
};

export default Bookmarks;
