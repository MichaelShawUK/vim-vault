export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    },
};

export interface Author {
  // columns
  id: number
  name: string
  created_at: string|null
  updated_at: string|null
  // relations
  plugins: Plugin[]
}

export interface Category {
  // columns
  id: number
  name: string
  created_at: string|null
  updated_at: string|null
  // relations
  plugins: Plugin[]
}

export interface Plugin {
  // columns
  id: number
  name: string
  author_id: number
  description: string
  stars: number
  url: string
  category_id: number
  created_at: string|null
  updated_at: string|null
  // relations
  author: Author
  category: Category
  tags: Tag[]
}

export interface Tag {
  // columns
  id: number
  name: string
  created_at: string|null
  updated_at: string|null
  // relations
  plugins: Plugin[]
}
