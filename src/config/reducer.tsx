import { Character, Comic, Story } from '../types/interfaces';

export type Action = {
  type:
    | 'LIST_OF_CHARACTER'
    | 'LIST_OF_COMICS'
    | 'SET_CHARACTER'
    | 'SET_CHARACTERS_COMICS'
    | 'SET_CHARACTER_STORIES'
    | 'SET_COMIC'
    | 'SET_COMIC_CHARACTERS'
    | 'SET_COMIC_STORIES'
    | 'SET_STORY'
    | 'LIST_OF_STORIES'
    | 'SET_STORY_COMICS'
    | 'SET_STORY_CHARACTERS'
    | 'SET_BOOKMARK_CHARACTER'
    | 'SET_BOOKMARK_COMIC'
    | 'SET_BOOKMARK_STORY'
    | 'GET_BOOKMARKS'
    | 'REMOVE_BOOKMARK'
    | 'DELETE_ALL_BOOKMARKS'
    | 'HIDE_RESOURCE'
  payload?: {
    characters?: Character[];
    character?: Character;
    charactersComics?: Comic[];
    characterStories?: Story[];
    comics?: Comic[];
    comic?: Comic;
    comicCharacters?: Character[];
    comicStories?: Story[];
    stories?: Story[];
    story?: Story;
    storyComics?: Comic[];
    storyCharacters?: Character[];
    bookmarkCharacter?: Character;
    bookmarkComic?: Comic;
    bookmarkStory?: Story;
    removeBookmark?: {
      type: string;
      id: number;
    };
    hideResource?: {
      type: string;
      id: number;
    };
    click?: boolean;
  };
};

export interface State {
  characters?: Character[] | null;
  character?: Character | null;
  charactersComics?: Comic[] | null;
  characterStories?: Story[] | null;
  comics?: Comic[] | null;
  comic?: Comic | null;
  comicCharacters?: Character[] | null;
  comicStories?: Story[] | null;
  stories?: Story[] | null;
  story?: Story | null;
  storyComics?: Comic[] | null;
  storyCharacters?: Character[] | null;
  bookmark: {
    comics: Comic[];
    characters: Character[];
    stories: Story[];
  };
  click?: boolean;
}

export const reducer = (state: State, action: Action): State => {
  const { type } = action;

  switch (type) {
    case 'LIST_OF_CHARACTER': {
      const characters = action.payload?.characters;
      if (characters) return { ...state, characters };
      break;
    }
    case 'SET_CHARACTER': {
      const character = action.payload?.character;
      if (character) return { ...state, character };
      break;
    }
    case 'SET_CHARACTERS_COMICS': {
      const charactersComics = action.payload?.charactersComics;
      if (charactersComics) return { ...state, charactersComics };
      break;
    }
    case 'SET_CHARACTER_STORIES': {
      const characterStories = action.payload?.characterStories;
      if (characterStories) return { ...state, characterStories };
      break;
    }
    case 'LIST_OF_COMICS': {
      const comics = action.payload?.comics;
      if (comics) return { ...state, comics };
      break;
    }
    case 'SET_COMIC': {
      const comic = action.payload?.comic;
      if (comic) return { ...state, comic };
      break;
    }
    case 'SET_COMIC_CHARACTERS': {
      const comicCharacters = action.payload?.comicCharacters;
      if (comicCharacters) return { ...state, comicCharacters };
      break;
    }
    case 'SET_COMIC_STORIES': {
      const comicStories = action.payload?.comicStories;
      if (comicStories) return { ...state, comicStories };
      break;
    }
    case 'LIST_OF_STORIES': {
      const stories = action.payload?.stories;
      if (stories) return { ...state, stories };
      break;
    }
    case 'SET_STORY': {
      const story = action.payload?.story;
      if (story) return { ...state, story };
      break;
    }
    case 'SET_STORY_COMICS': {
      const storyComics = action.payload?.storyComics;
      if (storyComics) return { ...state, storyComics };
      break;
    }
    case 'SET_STORY_CHARACTERS': {
      const storyCharacters = action.payload?.storyCharacters;
      if (storyCharacters) return { ...state, storyCharacters };
      break;
    }
    case 'SET_BOOKMARK_CHARACTER': {
      const bookmarkCharacter = action.payload?.bookmarkCharacter!;
        const bookmark = {
          ...state.bookmark,
          characters: [...state.bookmark.characters, bookmarkCharacter],
        };
        localStorage.setItem('BOOKMARKS', JSON.stringify(bookmark));
        if (bookmarkCharacter) return { ...state, bookmark };
      break;
    }
    case 'SET_BOOKMARK_COMIC': {
      const bookmarkComic = action.payload?.bookmarkComic!;
        const bookmark = {
          ...state.bookmark,
          comics: [...state.bookmark.comics, bookmarkComic],
        };
        localStorage.setItem('BOOKMARKS', JSON.stringify(bookmark));
        if (bookmarkComic) return { ...state, bookmark };      
      break;
    }
    case 'SET_BOOKMARK_STORY': {
      const bookmarkStory = action.payload?.bookmarkStory!;
        const bookmark = {
          ...state.bookmark,
          stories: [...state.bookmark.stories, bookmarkStory],
        };
        localStorage.setItem('BOOKMARKS', JSON.stringify(bookmark));
        if (bookmarkStory) return { ...state, bookmark };
      break;
    }
    case 'GET_BOOKMARKS': {
      if (localStorage.getItem('BOOKMARKS')) {
        const bookmark = JSON.parse(localStorage.getItem('BOOKMARKS')!);
        return { ...state, bookmark };
      }
      break;
    }
    case 'REMOVE_BOOKMARK': {
      const bookmarkId = action.payload?.removeBookmark?.id;
      const bookmarkType = action.payload?.removeBookmark?.type;
      let bookmark;
      if (bookmarkType === 'COMIC') {
        const comics = state.bookmark.comics;
        const newComics = comics.filter((el) => el.id !== bookmarkId);
        bookmark = {
          ...state.bookmark,
          comics: newComics,
        };
      } else if (bookmarkType === 'CHARACTER') {
        const characters = state.bookmark.characters;
        const newCharacters = characters.filter((el) => el.id !== bookmarkId);
        bookmark = {
          ...state.bookmark,
          characters: newCharacters,
        };
      } else if (bookmarkType === 'STORY') {
        const stories = state.bookmark.stories;
        const newStories = stories.filter((el) => el.id !== bookmarkId);
        bookmark = {
          ...state.bookmark,
          stories: newStories,
        };
      }
      if (bookmark) {
        localStorage.setItem('BOOKMARKS', JSON.stringify(bookmark));
        return { ...state, bookmark };
      }
      break;
    }
    case 'DELETE_ALL_BOOKMARKS': {
      if (localStorage.getItem('BOOKMARKS')) {
        localStorage.removeItem('BOOKMARKS');
        return {
          ...state,
          bookmark: { comics: [], characters: [], stories: [] },
        };
      }
      break;
    }
    case 'HIDE_RESOURCE': {
      const resourceId = action.payload?.hideResource?.id;
      const resourceType = action.payload?.hideResource?.type;
      if (resourceType === 'COMIC') {
        const comicsList = state.comics;
        const comics = comicsList!.filter((el) => el.id !== resourceId);
        return { ...state, comics };
      } else if (resourceType === 'CHARACTER') {
        const charactersList = state.characters;
        const characters = charactersList!.filter((el) => el.id !== resourceId);
        return { ...state, characters };
      } else if (resourceType === 'STORY') {
        const storiesList = state.stories;
        const stories = storiesList!.filter((el) => el.id !== resourceId);
        return { ...state, stories };
      }
    }
  }
  return { ...state };
};
