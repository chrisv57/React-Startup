import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


// The “describe” block is our test suite, and the “test” blocks are our test cases.

describe('Something true and false',()=>{
  test('true to be true',()=>{
    expect(true).toBeTruthy();
  });

  test('false to be false',()=>{
  expect(false).toBeFalsy();
  });
});


//Test blocks can also be written as "it".
// describe('App Component',()=>{
//   it('removes an item when clicking the dismiss button',()=>{

//   });

//   it('request initial stoires from the API',()=>{

//   });
// });
