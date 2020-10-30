import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { News } from './news/News';
import './App.css';
import 'antd/dist/antd.css'
import { Layout, Menu, Breadcrumb } from 'antd';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from 'react-router-dom';
import { Details } from './details/Details';
import {
    fetchSources,
    selectSources
} from './news/newsSlice';

function App() {
    const { Header, Content} = Layout;
    const [currArticle, setCurrArticle] = useState(null);
    const [currSource, setCurrSource] = useState('abc-news');

    const handleNewsClick = article => event => {
        setCurrArticle(article);
    }

    const sources = useSelector(selectSources);
    const dispatch = useDispatch();
    // console.log(useLocation);
    // const location = useLocation();

    useEffect(() => {
        dispatch(fetchSources());
    }, [dispatch]);
    
    // useEffect(() => {
    //     console.log(location);
    // }, [location]);

    const handleSourceClick = id => event => {
        setCurrSource(id)
    }

    return (
        <Router>
            <Layout className="layout">
                <Header>
                    <div className="logo" />

                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[currSource]}>
                        {
                            sources.map(src => (
                                <Menu.Item key={src.id} onClick={handleSourceClick(src.id)}>
                                    <Link to="/">
                                        { src.name }
                                    </Link>
                                </Menu.Item>
                            ))
                        }
                    </Menu>
                </Header>

                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0'}}>
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>

                        {
                            (window.location.pathname !== '/' && currArticle) &&
                            <Breadcrumb.Item>
                                <Link to="/details">
                                    {currArticle.title}
                                </Link>
                            </Breadcrumb.Item>
                        }
                    </Breadcrumb>

                    <div className="site-layout-content">
                        <Switch>
                            <Route exact path="/">
                                <News
                                    handleNewsClick={handleNewsClick}
                                    source={currSource}
                                />
                            </Route>

                            <Route exact path="/details">
                                <Details
                                    article={currArticle}
                                />
                            </Route>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        </Router>
    );
}

export default App;
