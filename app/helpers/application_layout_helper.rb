# frozen_string_literal: true

module ApplicationLayoutHelper

  private

  def authentication_or_application_layout
    puts "Selecting layout"

    return 'authentication/authentication' if devise_controller?

    'application'
  end
end