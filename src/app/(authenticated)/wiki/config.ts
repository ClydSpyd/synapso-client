export const wikiItemsConfig: Record<WikiType, WikiItemConfig> = {
    quote: {
        type: "quote",
        label: "Quotes",
        mainColor: "var(--wiki-main-four",
        accentColor: "var(--wiki-accent-four",
    },
    movie: {
        type: "movie",
        label: "Movies",
        mainColor: "var(--wiki-main-one)",
        accentColor: "var(--wiki-accent-one)",
    },
    series: {
        type: "series",
        label: "Series",
        mainColor: "var(--wiki-main-three)",
        accentColor: "var(--wiki-accent-three)",
    },
    book: {
        type: "book",
        label: "Books",
        mainColor: "var(--wiki-main-two)",
        accentColor: "var(--wiki-accent-two)",
    },
    link: {
        type: "link",
        label: "Links",
        mainColor: "var(--wiki-main-five)",
        accentColor: "var(--wiki-accent-five)",
    },
};