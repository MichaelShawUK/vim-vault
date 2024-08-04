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
  login: string
  avatar_url: string
  html_url: string
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
  full_name: string
  author_id: number
  description: string
  stargazers_count: number
  html_url: string
  url: string
  archived: boolean
  category_id: number
  created_at: string
  updated_at: string
  // relations
  author: Author
  category: Category
  tags: Tag[]
}

export interface Tag {
  // columns
  id: number
  name: string
  hits: number
  created_at: string|null
  updated_at: string|null
  // relations
  plugins: Plugin[]
}

export type SortCategories = "Stars" | "Name" | "Owner" | "Updated" | "Created";
