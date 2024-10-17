# frozen_string_literal: true

class HomeController < ApplicationController
  layout "home"
  before_action :authenticate_user!

  def index
    @hello_world_props = { name: "Stranger", logout_path: destroy_user_session_path }
  end
end
