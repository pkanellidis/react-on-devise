# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  include JsonResponseHelper

  # POST /resource/confirmation
  def create
    self.resource = resource_class.send_confirmation_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      respond_with(location: after_resending_confirmation_instructions_path_for(resource_name)) do |format|
        format.json do
          json_success(message: I18n.t('devise.confirmations.send_instructions'))
        end
      end
    else
      respond_with(resource) do |format|
        format.json do
          json_error(errors: resource.errors.full_messages, status: :unprocessable_entity)
        end
      end
    end
  end
end
