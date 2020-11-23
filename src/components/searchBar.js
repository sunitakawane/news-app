import React from "react";
import { Button, Form } from "semantic-ui-react";

function SearchBar(props) {
  const [searchTopic, setSearchTopic] = React.useState("");
  const handleChange = (event) => {
    setSearchTopic(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.searchForTopic(searchTopic);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder="Search topic"
            name="topic"
            value={searchTopic}
            onChange={handleChange}
          />
          <Button type="submit" color="green">
            Search
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
export default SearchBar;
