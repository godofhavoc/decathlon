import { createSlice } from '@reduxjs/toolkit';

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news: [],
        sources: []
    },
    reducers: {
        getNews: (state, action) => {
            console.log('new: ', action.payload);

            if (action.payload.status !== 'error') {
                if (action.payload.page === 1) {
                    state.news = action.payload.articles || []
                } else {
                    state.news = [...state.news, ...action.payload.articles];
                }
            }
        },
        getSources: (state, action) => {
            console.log('sources: ', action.payload);
            state.sources = action.payload.sources || [];
        }
    }
});

export const { getNews, getSources } = newsSlice.actions;

export const fetchSources = () => async dispatch => {
    var url = 'https://newsapi.org/v2/sources?language=en&country=us&apiKey=54850820813d42fea5fc1710103363bf';

    var req = new Request(url);

    const res = await fetch(req);
    const data = {...await res.json()}
    dispatch(getSources(data));
}

export const fetchNewsAPI = (source, page = 1) => async dispatch => {
    var url = 'http://newsapi.org/v2/everything?' +
    `sources=${source}&` +
    'pageSize=12&' +
    `page=${page}&` + 
    'apiKey=54850820813d42fea5fc1710103363bf';

    var req = new Request(url);

    const res = await fetch(req);
    const data = {
        ...await res.json(),
        page
    }
    dispatch(getNews(data));
}

export const selectNews = state => state.news.news;
export const selectSources = state => state.news.sources;

export default newsSlice.reducer;