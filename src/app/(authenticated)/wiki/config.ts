export const wikiItemsConfig: Record<WikiType, WikiItemConfig> = {
    quote: {
        type: "quote",
        label: "Quotes",
        mainColor: "var(--accent-mid-one)",
        accentColor: "var(--accent-light-one)",
    },
    movie: {
        type: "movie",
        label: "Movies",
        mainColor: "var(--accent-mid-six)",
        accentColor: "var(--accent-light-six)",
    },
    series: {
        type: "series",
        label: "Series",
        mainColor: "var(--accent-mid-four)",
        accentColor: "var(--accent-light-four)",
    },
    book: {
        type: "book",
        label: "Books",
        mainColor: "var(--accent-mid-two)",
        accentColor: "var(--accent-light-two)",
    },
    link: {
        type: "link",
        label: "Links",
        mainColor: "var(--accent-mid-five)",
        accentColor: "var(--accent-light-five)",
    },
};