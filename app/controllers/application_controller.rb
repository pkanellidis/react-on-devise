class ApplicationController < ActionController::Base
  include ApplicationLayoutHelper
  include JsonRespondable

  layout :authentication_or_application_layout

  private

  def authenticate_user!
    redirect_to new_user_session_url unless user_signed_in?
  end
end
