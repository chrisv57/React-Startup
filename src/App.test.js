import * as React from 'react';
import axios from "axios";
jest.mock('axios');

import App, {
  storiesReducer, SearchForm, InputWithLabel, List, Item,
} from './App';

import {
  render,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';
import { isPartiallyEmittedExpression } from 'typescript';

// describe('SearchForm',()=>{
//   it('Submit from testing',()=>{
//     const searchTerm = 
//   });
// });

const storyOne = {
  title: 'React',
  url: 'https://reactjs.org/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const storyTwo = {
  title: 'Redux',
  url: 'https://redux.js.org/',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne,storyTwo];

// describe('storiesReducer',()=>{
//   test('remove a story from the list',()=>{
//     const action = {type: 'REMOVE_STORY', payload: storyOne};
//     const state = {data: stories,isLoading:false,isError:false};
//     const newState = storiesReducer(state,action);
//     const expectedState = {
//       data: [storyTwo],
//       isLoading:false,
//       isError:false,
//     }
//     expect(newState).toStrictEqual(expectedState);
//   });
// });

describe('App',()=>{
  test('succeeds fetching data',async()=>{
    const promise = Promise.resolve({
      data:{
        hits:stories,
      },
    });
    axios.get.mockImplementationOnce (()=>promise);
    render(<App />);
    expect(screen.queryByText(/Loading/)).toBeInTheDocument();
    screen.debug();
    await act(()=>promise);
    expect(screen.queryByText(/Loading/)).toBeNull();
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Redux')).toBeInTheDocument();
    expect(screen.getAllByText('cross.svg').length).toBe(2);
  });
  test('fails fetching data',async()=>{
    const promise = Promise.reject();
    axios.get.mockImplementationOnce(()=>promise);
    render (<App/>);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
    try{
      await act(()=>promise);
    }catch(error){
      expect(screen.queryByText(/Loading/)).toBeNull();
      expect(screen.queryByText(/went wrong/)).toBeInTheDocument();
    }
  });
  test('removes a story',async()=>{
    const promise = Promise.resolve({
      data: {
        hits: stories,
      },
    });
    axios.get.mockImplementationOnce(()=>promise);
    render(<App />);
    await act(()=>promise);
    expect(screen.getAllByText('cross.svg').length).toBe(2);
    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('cross.svg')[0]);
    expect(screen.getAllByText('cross.svg').length).toBe(1);
    expect(screen.queryByText('Jordan Walke')).toBeNull();
  })
});

// describe('Item',()=>{
//   it('renders all properties',()=>
//   {
//     render(<Item item = {storyOne}/>);

//     expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
//     expect(screen.getByText('React')).toHaveAttribute(
//       'href',
//       'https://reactjs.org/'
//     );
//   });
//   test('render a clickable dismss button',()=>{
//     render(<Item item = {storyOne}/>);
//     expect(screen.getByRole('button')).toBeInTheDocument();
//   });

//   test('clicking the dismiss button calls the callback handler',()=>{
//     const handleRemoveItem = jest.fn();
//     render(<Item item = {storyOne} onRemoveItem={handleRemoveItem} />);
//     fireEvent.click(screen.getByRole('button'));
//     expect(handleRemoveItem).toHaveBeenCalledTimes(1);
//   });
// });

// describe('SearchForm',()=>{
//   const SearchFormProps = {
//     searchTerm: 'React',
//     onSearchInput: jest.fn(),
//     onSearchSubmit: jest.fn(),
//   };
//   test('renders the input field with its value',()=>{
//     render(<SearchForm{...SearchFormProps} />);

//     expect(screen.getByDisplayValue('React')).toBeInTheDocument();
//     // screen.debug();
//   });



//   test('renders the correct label',()=>{
//     render(<SearchForm{...SearchFormProps}/>);
//     expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
//   });
  
  // test('calls onSearchInput on input field change', () => {
  //   render(<SearchForm {...SearchFormProps} />);
  //   fireEvent.change(screen.getByDisplayValue('React'), {
  //   target: { value: 'Redux' },
  //   });
  //   expect(SearchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
  //   });

  // test('calls onSearchSubmit on button submit click',()=>{
  //   render(<SearchForm{...SearchFormProps}/>);
  //   fireEvent.submit(screen.getByRole('button'));
  //   expect(SearchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  // });
// });