# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # POST /resource/password
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      respond_with(location: after_sending_reset_password_instructions_path_for(resource_name)) do |format|
        format.json do
          json_success(message: I18n.t('devise.passwords.send_instructions'))
        end
      end
    else
      respond_with do |format|
        format.json do
          json_error(errors: resource.errors.full_messages, status: :unprocessable_entity)
        end
      end
    end
  end

  # PUT /resource/password
  def update
    self.resource = resource_class.reset_password_by_token(resource_params)

    if resource.errors.empty?
      message = nil
      resource.unlock_access! if unlockable?(resource)
      if resource_class.sign_in_after_reset_password
        message = resource.active_for_authentication? ? I18n.t('devise.passwords.updated') : I18n.t('devise.passwords.updated_not_active')
        resource.after_database_authentication
        sign_in(resource_name, resource)
      else
        message = I18n.t('devise.passwords.updated_not_active')
      end
      respond_with(location: after_resetting_password_path_for(resource)) do |format|
        format.json do
          json_success message: message, status: :ok
        end
      end
    else
      set_minimum_password_length
      respond_with do |format|
        format.json do
          json_error errors: resource.errors.full_messages, status: :unprocessable_entity
        end
      end
    end
  end
end
