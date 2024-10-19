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
          json_error(errors: resource.errors.full_messages, status: :bad_request)
        end
      end
    end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

  # PUT /resource/password
  # def update
  #   super
  # end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end
