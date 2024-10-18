import ReactOnRails from 'react-on-rails';

import Login from '../bundles/Authentication/components/Login/Login';
import Register from '../bundles/Authentication/components/Register/Register';

// This is how react_on_rails can see the Home in the browser.
ReactOnRails.register({
  Login, Register
});
