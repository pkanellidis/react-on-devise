import ReactOnRails from 'react-on-rails';

import Home from '../bundles/Home/components/Home';
import TopMenu from '../bundles/Home/components/Menu/TopMenu';

// This is how react_on_rails can see the Home in the browser.
ReactOnRails.register({
  Home, TopMenu
});
