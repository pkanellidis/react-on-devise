# frozen_string_literal: true

class HomeController < ApplicationController
  layout "home"
  before_action :authenticate_user!

  def index
    @home_props = { name: "Panais", logout_path: destroy_user_session_path }
  end
end
