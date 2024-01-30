export interface Article {
    id: number;
    title: string;
    description: string;
    link: string;
    pubDate: string;
}

export interface FeedData {
    data: Article[];
    totalCount: number;
}
export interface ArticleSchema {
    feed: FeedData;
    search: string;
    error: string | undefined;
    isLoading: boolean;
}
