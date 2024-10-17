# frozen_string_literal: true

module AuthenticationRoutesHelper
  def authentication_routes_for_login
    {
      login_path: user_session_path,
      register_path: new_user_registration_path,
      forgot_password_path: new_user_password_path,
    }
  end
end