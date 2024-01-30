export interface Article {
    title: string;
    description: string;
    link: string;
    guid: {
        _: string;
        isPermaLink: string;
    };
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
