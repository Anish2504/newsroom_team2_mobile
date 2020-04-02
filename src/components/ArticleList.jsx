import React, { Component } from 'react'
import axios from 'axios'
import { IonCard  } from '@ionic/react';


class ArticleList extends Component {
    componentDidMount() {
        axios.get("/articles").then(response => {
            this.props.dispatch({
                type: "ARTICLES",
                payload: { articleList: response.data.articles }
            });
        });
    }

    async articleFetcher (event) {
        let id = event.target.dataset.id
        let response = await axios.get(`/articles/${id}`)
        this.props.dispatch({
            type: "SHOW_ARTICLE",
            payload: { readArticle: response.data}
        })
    }

    render() {
        let articleDisplay;
    if (this.props.articleList !== []) {
      articleDisplay = this.props.articleList.map(article => {
        return (
          <IonCard
            key={article.id}
          >
            <div id={article.id} className="article-box">
              <div className="feature-article">
                <div className="article-headline">
                  <h2>{article.title}</h2>
                  <div className="article-teaser">
                    <p>{article.teaser}</p>
                  </div>
                  <IonButton color="light"
                    data-id={article.id}
                    type="submit"
                    primary
                    label="Read More"
                    onClick={this.articleFetcher.bind(this)}
                  ></IonButton>
                </div>
              </div>
            </div>
          </IonCard>
        );
      });
    }
        return (            
            {articleDisplay}            
        )
    }
}

const mapStateToProps = state => {
    return {
      articleList: state.articleList
    };
  };
  
  export default connect(mapStateToProps)(ArticleList);
