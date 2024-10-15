# frozen_string_literal: true

namespace :seed do
  desc "Seed the development database"
  task dev: :environment do
    require_relative "../../db/seeds_development"
  end
end