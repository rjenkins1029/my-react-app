import React from "react";

const Search = ({ setSearchTerm, searchTerm, allPosts, setFilteredPosts }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.searchBar.value);

    function postMatches(post, searchTerm) {
      if (
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.price.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
    const filteredPosts = allPosts.filter((post) =>
      postMatches(post, searchTerm)
    );
    setFilteredPosts(filteredPosts);
  };
  return (
    <form id="searchBar" onSubmit={handleSubmit}>
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        name="searchBar"
        placeholder="Search all postings"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      ></input>
      <button name="searchBarButton" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;