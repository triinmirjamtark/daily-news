
import React, { useState } from 'react'; // impordime 
import client from '../apollo'; // impordime 
import gql from 'graphql-tag'; // impordime 

import Article from './Article';

// see asi 
const query = gql` 
query {
    articles {
      title
      source {
        name 
      }
      urlToImage
      url
    }
  }
`

const ArticleFeed = () => {

    const [data, setData] = useState([])

    client.query({query})
    .then(response => setData(response.data.articles))
    .catch(error => console.log(error))

    return (
        <div className="feed">
            { data.map((article, i) => 
            <Article 
                isSmall={(i + 1) % 5 === 0 || (i + 2) % 5 === 0 || (i + 3) % 5 === 0} 
                data={article} 
                key={i} 
                /> 
            )}
            <a href="https://newsapi.org/" target="_blank">Made with NewsApi.org</a>
        </div>
    )
}

export default ArticleFeed;