import * as React from 'react'
function getTitle(title) {
  return title;
}
const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  // Defining the stateFunction here so that we can access the searchTerm to filter the list by title.
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
  );

//   //We’ll use React’s useEffect Hook to trigger
// the side-effect each time the searchTerm changes:
  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]
  );


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  //This fucntion is used to filter the list using the searchTerm 
  // const searchedStories = stories.filter(function (story){
  //   return story.title.includes(searchTerm);
  // });

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div>
      <h1>Hey {getTitle('React')}</h1>

      {/* <Search /> */}
      <hr />
      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />
      <List list={searchedStories} />
    </div>

  );
};

//We Completely removed the props by add the prop object properties to the function signature.
const Search = ({ search, onSearch }) => (
  <div>
    <label htmlFor='search'>Search: </label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={onSearch}
    />
  </div>
);

//USing Spread and Rest Operators
const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

//Nested Destruction 
const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
)
export default App;