interface Feed {
    title: string;
    description: string;
    link: string;
    guid: {
        _: string;
        isPermaLink: string;
    };
    pubDate: string;
}

export interface FeedSchema {
    feed: Feed[];
    error: string;
}
