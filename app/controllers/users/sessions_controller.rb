# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include JsonResponseHelper
  
  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_with location: after_sign_in_path_for(resource) do |format|
      format.json do
        json_success
      end
    end
  end
end
