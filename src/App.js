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
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { stories: initalStories } }),
      2000
    )
  );
const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,isLoading:true,isError:false,
      };
      case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading:false,
        isError:false,
        data: action.payload,
      };
      case 'STORIES_FETCH_FAILURE':
        return {
          ...state,
          isLoading:false,
          isError:true,
        };
    case 'REMOVE_STORY':
      return{
        ...state,
        data: state.data.filter(
          (story)=>action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};
const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search', 'React'
  );

//Merging states using useReducer hook
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {data:[],isLoading:false,isError:false}
  );


  // //Conditional Redenring: Setting a loading interface to let the users know about the loading of the data
  // const [isLoading, setisLoading] = React.useState(false);

  // const [isError, setisError] = React.useState(false);

  React.useEffect(() => {
    
    dispatchStories({type:'STORIES_FETCH_INIT'});

    getAsyncStories()
    .then(result => {
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.stories,
      });
    })

      //Providing a catch to the promise in case something went wrong while fethcing data.
      .catch(() => dispatchStories({type: 'STORIES_FETCH_FAILURE'})
   );
   }, []);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  //This fucntion is used to filter the list using the searchTerm 
  // const searchedStories = stories.filter(function (story){
  //   return story.title.includes(searchTerm);
  // });

  const searchedStories = stories.data.filter((story) =>
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

      {/* In JavaScript, a true && 'Hello World' always evaluates to ‘Hello World’. A false && 'Hello World'
always evaluates to false. */}
      {stories.isError && <p>Something went wrong....</p>}
      {stories.isLoading ? (
        <p>Loading....</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}

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