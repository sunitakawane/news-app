/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Grid, Header, Image, List } from "semantic-ui-react";

const ArticleItem = (props) => {
  const { article } = props;
  const [showDetails, setShowDetails] = React.useState(false);
  return (
    <List.Item style={{ padding: 30 }}>
      <Grid>
        <Grid.Column
          width={16}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Header as="h3">
            {article.title}
            <a
              style={{ fontSize: 12 }}
              className="btn btn-primary"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? (
                <span> &nbsp;&nbsp;&nbsp;&nbsp;Show less</span>
              ) : (
                <span> &nbsp;&nbsp;&nbsp;&nbsp;Show more</span>
              )}
            </a>
          </Header>
          {showDetails ? (
            <Grid>
              <Grid.Column
                width={8}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <List.Description style={{ margin: "20px 0" }}>
                  {article.description}
                </List.Description>
                <List bulleted horizontal>
                  <List.Item>
                    <a href={article.url}>{article.source.name}</a>
                  </List.Item>
                  <List.Item>{article.publishedAt.split("T")[0]}</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src={article.urlToImage} />
              </Grid.Column>
            </Grid>
          ) : (
            <div></div>
          )}
        </Grid.Column>
      </Grid>
    </List.Item>
  );
};
const ArticlesList = (props) => {
  return (
    <List divided style={{ maxWidth: 900, margin: "0 auto" }}>
      {props.articles.map((article, index) => (
        <ArticleItem article={article} key={article.title + index} />
      ))}
    </List>
  );
};

export default ArticlesList;
