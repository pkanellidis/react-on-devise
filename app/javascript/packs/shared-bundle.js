import ReactOnRails from 'react-on-rails';

import ErrorMessage from '../bundles/Shared/components/Error/ErrorMessage';
import FormErrors from '../bundles/Shared/components/Error/FormErrors';
import InfoMessage from '../bundles/Shared/components/Info/InfoMessage';

// This is how react_on_rails can see the Home in the browser.
ReactOnRails.register({
  ErrorMessage, FormErrors, InfoMessage
});
