import React from "react";
import { getArticles, getTrendingArticles, getCategoryArticles } from "./news";
import { Container, Menu } from "semantic-ui-react";
import ArticleList from "./components/articlesList";
import SearchBar from "./components/searchBar";

function App() {
  const [articles, setArticles] = React.useState([]);
  const [apiError, setApiError] = React.useState(null);
  const [searchTopic, setSearchTopic] = React.useState("");
  const [category, setCategory] = React.useState("Top");
  const [loading, setLoading] = React.useState(false);

  const searchForTopic = async (searchTopic) => {
    try {
      const response = await getArticles(searchTopic);
      setArticles(response.articles);
      setSearchTopic(searchTopic);
    } catch (error) {
      setApiError("Could not find any articles");
    }
    setLoading(false);
  };

  const handleItemClick = (cat) => {
    console.log(cat);
    setCategory(cat);
  };

  React.useEffect(() => {
    setLoading(true);
    setCategory("Top");
    setLoading(false);
  }, []);

  React.useEffect(() => {
    const fetchTopArticles = async () => {
      try {
        const response =
          category === "Top"
            ? await getTrendingArticles()
            : await getCategoryArticles(category);
        setArticles(response.articles);
      } catch (error) {
        setApiError("Could not find any articles");
      }
    };
    setLoading(true);
    fetchTopArticles(category);
    setLoading(false);
  }, [category]);

  return (
    <div>
      <Menu pointing>
        <Menu.Item
          name="Trending News"
          active={category === "Top"}
          onClick={() => handleItemClick("Top")}
        />
        <Menu.Item
          name="Sports"
          active={category === "sports"}
          onClick={() => handleItemClick("sports")}
        />
        <Menu.Item
          name="Health"
          active={category === "health"}
          onClick={() => handleItemClick("health")}
        />
        <Menu.Item
          name="Tech"
          active={category === "technology"}
          onClick={() => handleItemClick("technology")}
        />
        <Menu.Item
          name="entertainment"
          active={category === "entertainment"}
          onClick={() => handleItemClick("entertainment")}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <SearchBar searchForTopic={searchForTopic} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Container>
        {loading && (
          <p style={{ textAlign: "center" }}>Searching for articles...</p>
        )}
        {articles.length > 0 && <ArticleList articles={articles} />}
        {apiError && <p>Could not fetch any articles. Please try again.</p>}
        <p style={{ textAlign: "center" }}>
          Powered by <a href="https://newsapi.org/">NewsAPI.org</a>
        </p>
      </Container>
    </div>
  );
}

export default App;
