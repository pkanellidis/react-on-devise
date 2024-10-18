# frozen_string_literal: true

module AuthenticationHelper
  def navigation_paths_for_scope
    routes = {}

    routes[:login_path] = new_session_path(resource_name) if controller_name != 'sessions'

    if devise_mapping.registerable? && controller_name != 'registrations'
      routes[:sign_up_path] = new_registration_path(resource_name)
    end

    if devise_mapping.recoverable? && controller_name != 'passwords' && controller_name != 'registrations'
      routes[:forgot_password_path] = new_password_path(resource_name)
    end

    if devise_mapping.confirmable? && controller_name != 'confirmations'
      routes[:comnfirm_path] = new_confirmation_path(resource_name)
    end

    if devise_mapping.lockable? && resource_class.unlock_strategy_enabled?(:email) && controller_name != 'unlocks'
      routes[:unlock_path] = new_unlock_path(resource_name)
    end

    if devise_mapping.omniauthable?
      routes[:oath_paths] = resource_class.omniauth_providers.map do |provider|
        omniauth_authorize_path(resource_name, provider)
      end
    end

    routes
  end
end