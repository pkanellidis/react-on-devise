# This file should ensure the existence of records required to run the application in every environment (production,
# development, spec). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#

return unless Rails.env.development?

include FactoryBot::Syntax::Methods

# Admin user
create(:user, :admin)

# General users
create_list(:user, 10)
