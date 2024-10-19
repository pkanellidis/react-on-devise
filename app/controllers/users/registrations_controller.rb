# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]

  # POST /resource
  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        sign_up(resource_name, resource)
        respond_with(location: after_sign_up_path_for(resource)) do |format|
          format.json do
            json_success(message: find_message(:signed_up), status: :created)
          end
        end
      else
        expire_data_after_sign_in!
        respond_with(location: after_inactive_sign_up_path_for(resource)) do |format|
          format.json do
            json_success(message: find_message("signed_up_but_#{resource.inactive_message}"), status: :created)
          end
        end
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with do |format|
        format.json do
          json_error(errors: resource.errors.full_messages, status: :unprocessable_entity)
        end
      end
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :username])
  end
end
