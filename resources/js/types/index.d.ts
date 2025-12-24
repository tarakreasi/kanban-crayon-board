export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    avatar_path?: string;
}

export interface Board {
    id: number;
    title: string;
    theme_color: string;
    user_id: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    tasks?: any[];
    boards?: Board[];
    activeBoard?: Board;
};
