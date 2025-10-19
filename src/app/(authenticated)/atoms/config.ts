import { FaBook } from "react-icons/fa";
import { PiLinkBold } from "react-icons/pi";
import { IoFilmOutline } from "react-icons/io5";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { PiTelevisionSimpleFill } from "react-icons/pi";


export const wikiItemsConfig: Record<WikiType, WikiItemConfig> = {
    quote: {
        type: "quote",
        label: "Quotes",
        mainColor: "var(--wiki-main-four)",
        accentColor: "var(--wiki-accent-four)",
        icon: BiSolidQuoteLeft,
    },
    movie: {
        type: "movie",
        label: "Movies",
        mainColor: "var(--wiki-main-one)",
        accentColor: "var(--wiki-accent-one)",
        icon: IoFilmOutline,
    },
    series: {
        type: "series",
        label: "Series",
        mainColor: "var(--wiki-main-three)",
        accentColor: "var(--wiki-accent-three)",
        icon: PiTelevisionSimpleFill,
    },
    book: {
        type: "book",
        label: "Books",
        mainColor: "var(--wiki-main-two)",
        accentColor: "var(--wiki-accent-two)",
        icon: FaBook,
    },
    link: {
        type: "link",
        label: "Links",
        mainColor: "var(--wiki-main-five)",
        accentColor: "var(--wiki-accent-five)",
        icon: PiLinkBold,
    },
};