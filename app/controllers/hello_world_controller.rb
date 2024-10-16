# frozen_string_literal: true

class HelloWorldController < ApplicationController
  layout "hello_world"

  def index
    @hello_world_props = { name: "Stranger", sign_out_path: destroy_user_session }
  end
end
