export const fetchPostAction = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: 'LOADING_DATA' });
  
        const response = await fetch(`http://localhost:3001/posts`);
  
        if (!response.ok) {
          // Handle non-successful HTTP responses (e.g., 404, 500, etc.) here.
          // You can throw an error or dispatch an action to handle the specific error.
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        const posts = json.data;
  
        dispatch({
          type: 'FETCH_POST_SUCCESS',
          payload: {
            posts,
          },
        });
      } catch (error) {
        // Handle errors here, you can log the error or dispatch an action to handle it.
        console.error('Error fetching data:', error);
         
      }
    };
  };