import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { getNewsAPI, getSourceAPI } from "./api";

export const NewsContext = createContext();

const Context = ({ children }) => {
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState("general");
    const [source, setSource] = useState();
    const [index, setIndex] = useState(1);
    const [darkTheme, setDarkTheme] = useState(true);

    const fetchNews = async (reset = category) => {
        const { data } = await axios.get(getNewsAPI(reset));
        setNews(data);
        setIndex(1);
    };

    const fetchNewsfromSource = async () => {
        try {
            const { data } = await axios.get(getSourceAPI(source));
            // console.log(data)
            setNews(data);
            setIndex(1);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNews();
        // console.log(category)
    }, [category]);

    useEffect(() => {
        fetchNewsfromSource();
        // console.log(source)
    }, [source]);

    return (
        <NewsContext.Provider
            value={{
                news,
                setCategory,
                index,
                setIndex,
                setSource,
                darkTheme,
                setDarkTheme,
                fetchNews,
            }}
        >
            {children}
        </NewsContext.Provider>
    );
};

export default Context;