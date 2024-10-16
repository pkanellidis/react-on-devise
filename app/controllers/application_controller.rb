class ApplicationController < ActionController::Base
  def authenticate_user!
    super if user_signed_in?

    redirect_to new_user_session
  end
end
