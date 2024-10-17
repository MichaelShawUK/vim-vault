export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        saved: number[]
    },
};

export interface Author {
    // columns
    id: number
    login: string
    avatar_url: string
    html_url: string
    created_at: string | null
    updated_at: string | null
    // relations
    plugins: Plugin[]
}

export interface Category {
    // columns
    id: number
    name: string
    created_at: string | null
    updated_at: string | null
    // relations
    plugins: Plugin[]
}

export interface Plugin {
    // columns
    id: number
    name: string
    full_name: string
    slug: string
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

export interface SavablePlugin extends Plugin {
    saved: boolean
}

export interface Tag {
    // columns
    id: number
    name: string
    hits: number
    created_at: string | null
    updated_at: string | null
    // relations
    plugins: Plugin[]
}

interface SearchData {
    query: string;
    searchName: boolean;
    searchTag: boolean;
    searchDescription: boolean;
    searchOwner: boolean;
}

type pluginAction =
    | { type: 'toggle_save', pluginId: string }
    | { type: 'toggle_sort_order' }
    | { type: 'sort_by_stars' }
    | { type: 'sort_by_name' }
    | { type: 'sort_by_owner' }
    | { type: 'sort_by_updated' }
    | { type: 'sort_by_created' }

export type SortCategories = "Stars" | "Name" | "Owner" | "Updated" | "Created";
