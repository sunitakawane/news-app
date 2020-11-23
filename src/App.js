import React from "react";
import { getArticles } from "./news";
import { Container, Header } from "semantic-ui-react";
import ArticleList from "./components/articlesList";
import SearchBar from "./components/searchBar";

function App() {
  const [articles, setArticles] = React.useState([]);
  const [apiError, setApiError] = React.useState(null);
  const [searchTopic, setSearchTopic] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [totalResults, setTotalResults] = React.useState(0);

  const searchForTopic = async (searchTopic) => {
    try {
      const response = await getArticles(searchTopic);
      setArticles(response.articles);
      setSearchTopic(searchTopic);
      setTotalResults(response.totalResults);
    } catch (error) {
      setApiError("Could not find any articles");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Header as="h2" style={{ textAlign: "center", margin: 20 }}>
        Search for a topic
      </Header>
      <SearchBar searchForTopic={searchForTopic} />

      {loading && (
        <p style={{ textAlign: "center" }}>Searching for articles...</p>
      )}
      {articles.length > 0 && (
        <Header as="h4" style={{ textAlign: "center", margin: 20 }}>
          Found {totalResults} articles on "{searchTopic}"
        </Header>
      )}
      {articles.length > 0 && <ArticleList articles={articles} />}
      {apiError && <p>Could not fetch any articles. Please try again.</p>}
      <p style={{ textAlign: "center" }}>
        Powered by <a href="https://newsapi.org/">NewsAPI.org</a>
      </p>
    </Container>
  );
}

export default App;
