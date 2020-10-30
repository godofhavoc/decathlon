import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
    fetchNewsAPI,
    selectNews
} from './newsSlice';

export function News(props) {
    const news = useSelector(selectNews);
    const source = props.source;
    const dispatch = useDispatch();
    const prevSource = useRef(source);
    useEffect(() => {
        prevSource.current = source;
    })

    const [page, setPage] = useState(1);
    // const [prevY, setPrevY] = useState(0);
    // const [loading, setLoading] = useState(false);
    // const loadingRef = useRef(null);

    // const handleObserver = (entities, observer) => {
    //     const y = entities[0].boundingClientRect.y;
    //     console.log(prevY);
    //     if (prevY > y) {
    //         setPage(page + 1);
    //     }
    //     console.log(y)
    //     setPrevY(y)
    // }

    // useEffect(() => {
    //     const options = {
    //         root: null,
    //         rootMargin: "0px",
    //         threshold: 1.0
    //     };

    //     const observer = new IntersectionObserver(
    //         handleObserver,
    //         options
    //     );
        
    //     if (loadingRef) {
    //         console.log(loadingRef);
    //         observer.observe(loadingRef.current);
    //     }
    // }, [loadingRef]);

    useEffect(() => {
        console.log('here', prevSource.current);
        dispatch(fetchNewsAPI(source, page));
    }, [source, page, dispatch]);

    const updateNews = () => {
        setPage(page + 1);
    }

    const news_chunks = Array(Math.ceil(news.length / 3)).fill().map((_, index) => index * 3).map(begin => news.slice(begin, begin + 3));

    const { Meta } = Card

    return (
        <div className="container">
            {/* <div ref={loadingRef}>

            </div> */}

            <InfiniteScroll
                dataLength={news.length} //This is important field to render the next data
                next={updateNews}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                // endMessage={
                //     <p style={{ textAlign: 'center' }}>
                //         <b>Yay! You have seen it all</b>
                //     </p>
                // }
            >
                {
                    news_chunks.map(news_row => (
                        <Row>
                            {
                                news_row.map(article => (
                                    <Col span={8}>
                                        <Link to="/details">
                                            <Card
                                                hoverable
                                                style={{ width: 340, minHeight: 340, marginBottom: 20 }}
                                                cover={<img alt="" src={article.urlToImage} />}
                                                onClick={ props.handleNewsClick(article) }
                                            >
                                                <Meta
                                                    title={article.title}
                                                    description={article.description}
                                                />
                                            </Card>
                                        </Link>
                                    </Col>
                                ))
                            }
                        </Row>
                    ))
                }
            </InfiniteScroll>
        </div>
    );
}