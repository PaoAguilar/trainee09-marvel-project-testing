import { ReactNode } from "react";

export interface Comic {
  id: number,
  title: string,
  thumbnail : {
      extension: string,
      path: string
  },
  description: string,
  format: string
}
export interface Character {
  id: number,
  name: string,
  thumbnail : {
      extension: string,
      path: string
  },
  description: string
}
export interface Story {
  id: number,
  title: string
}
export interface ChildrenProps {
  children: ReactNode;
}

export interface TypesContext {
    Characters: {
      characters: Character[]
    },
    Stories: {
      stories: Story[]
    },
    Comics: {
      comics: Comic[]
    },
}
  
