import ReactOnRails from 'react-on-rails';

import Login from '../bundles/Authentication/components/Login/Login';
import Register from '../bundles/Authentication/components/Register/Register';
import ResendConfirmationInstructions from '../bundles/Authentication/components/ResendConfirmation/ResendConfirmationInstructions';
import NavigationLinks from '../bundles/Authentication/components/NavigationLinks/NavigationLinks';
import ForgotPassword from '../bundles/Authentication/components/ResetPassword/ForgotPassword';
import ChangePassword from '../bundles/Authentication/components/ResetPassword/ChangePassword';

// This is how react_on_rails can see the Home in the browser.
ReactOnRails.register({
  Login,
  Register,
  ResendConfirmationInstructions,
  NavigationLinks,
  ForgotPassword,
  ChangePassword
});
