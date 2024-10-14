# frozen_string_literal: true

module Api
  class ApiRodauthController < ActionCable::Api
    include ActionController::RequestForgeryProtection
    skip_before_action :verify_authenticity_token
    protect_from_forgery with: :null_session

    private
    def current_user
      rodauth.rails_account
    end

    def authenticate!
      rodauth.require_authentication
    end
  end
end