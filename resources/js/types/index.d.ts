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

export interface Comment {
    // columns
    id: number
    comment: string
    plugin_id: number
    user_id: number
    created_at: string | null
    updated_at: string | null
    // relations
    plugin: Plugin
    user: User
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
    created_at: string
    updated_at: string
    uploaded_at: string
    // relations
    author: Author
    tags: Tag[]
    saved_by: User[]
    comments: Comment[]
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

export interface User {
    // columns
    id: number
    name: string
    nickname: string | null
    email: string
    email_verified_at: string | null
    avatar_url: string | null
    github_id: string | null
    created_at: string | null
    updated_at: string | null
    // relations
    saved_plugins: Plugin[]
    comments: Comment[]
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        saved: number[]
    },
};

export interface SavablePlugin extends Plugin {
    saved: boolean
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
