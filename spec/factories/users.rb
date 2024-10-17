# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    username { Faker::Internet.user_name[0..14] }
    password { Faker::Internet.password }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }

    admin { false }

    trait :admin do
      admin { true }
      email { "admin@test.com" }
      password { "123456" }
      confirmed_at { Time.current }
    end
  end
end