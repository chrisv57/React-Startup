import * as React from 'react'
function getTitle(title) {
  return title;
};

const useSemiPersistentState = (key, initalState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initalState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};
const initalStories = [
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

const getAsyncStories = () => 
  new Promise((resolve)=>
  setTimeout(
    ()=>resolve({data:{stories:initalStories}}),
    2000
  )
  );

const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search', 'React'
  );

  const [stories, setStories] = React.useState([]);

  React.useEffect(()=>{
    getAsyncStories().then(result =>{
      setStories(result.data.stories);
    });
  },[]);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

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
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>

  );
};

// Declarative Implementation of autofocus for the inputField
const InputWithLabel = ({ id, label, value, type = 'text', onInputChange, isFocused, children }) => {
  const inputRef = React.useRef();
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]
  );
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

//USing Spread and Rest Operators
const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
          
        />
    ))}
  </ul>
);

//Nested Destruction 
const Item = ({ item, onRemoveItem }) => {

  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
      </span>
    </li>
  );
};
export default App;