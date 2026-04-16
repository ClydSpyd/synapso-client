import { FaBook } from "react-icons/fa";
import { PiLinkBold } from "react-icons/pi";
import { IoFilmOutline } from "react-icons/io5";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { colorCombos } from "@/config/color-config";


export const wikiItemsConfig: Record<WikiType, WikiItemConfig> = {
    quote: {
        type: "quote",
        label: "Quotes",
        mainColor: colorCombos[0].mainColor,
        accentColor: colorCombos[0].accentColor,
        // mainColor: "var(--wiki-main-four)",
        // accentColor: "var(--wiki-accent-four)",
        icon: BiSolidQuoteLeft,
    },
    movie: {
        type: "movie",
        label: "Movies",
        mainColor: colorCombos[1].mainColor,
        accentColor: colorCombos[1].accentColor,
        // mainColor: "var(--wiki-main-one)",
        // accentColor: "var(--wiki-accent-one)",
        icon: IoFilmOutline,
    },
    series: {
        type: "series",
        label: "Series",
        mainColor: colorCombos[2].mainColor,
        accentColor: colorCombos[2].accentColor,
        // mainColor: "var(--wiki-main-three)",
        // accentColor: "var(--wiki-accent-three)",
        icon: PiTelevisionSimpleFill,
    },
    book: {
        type: "book",
        label: "Books",
        mainColor: colorCombos[3].mainColor,
        accentColor: colorCombos[3].accentColor,
        // mainColor: "var(--wiki-main-two)",
        // accentColor: "var(--wiki-accent-two)",
        icon: FaBook,
    },
    link: {
        type: "link",
        label: "Links",
        mainColor: colorCombos[4].mainColor,
        accentColor: colorCombos[4].accentColor,
        // mainColor: "var(--wiki-main-five)",
        // accentColor: "var(--wiki-accent-five)",
        icon: PiLinkBold,
    },
};