import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TopMenu from "./Menu/TopMenu";

const Home = (props, railsContext) => {
  return () => {
      const [name, setName] = useState(props.name);
      console.log(railsContext)

      return (
          <>
              <TopMenu/>
              <div>
                  <h3>Hello, {name}!</h3>
                  <hr />
                  <form>
                      <label htmlFor="name">
                          Say hello to:
                          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                      </label>
                  </form>
              </div>
          </>
      );
  }
};

Home.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default Home;
