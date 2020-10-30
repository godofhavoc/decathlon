import React from 'react';
import { Redirect } from 'react-router-dom';

export function Details(props) {
    if (!props.article) {
        return <Redirect to="/" />
    }
    const article = props.article;

    return (
        <div>
            <h1>
                <a target="_blank" rel="noreferrer" href={article.url}>{ article.title }</a>
            </h1>
            <h4>{ article.author }</h4>

            <img alt="" src={ article.urlToImage } />

            <p>{ article.content }</p>
        </div>
    )
}