User.create!(name:  "Admin",
             email: "admin@example.com",
             password:              "password",
             password_confirmation: "password",
             admin:     true,
             activated: true,
             activated_at: Time.zone.now)

99.times do |n|
  name  = Faker::Commerce.color
  email = "example-#{n+1}@example.com"
  password = "password"
  User.create!(name:  name,
              email: email,
              password:              password,
              password_confirmation: password,
              activated: true,
              activated_at: Time.zone.now)
end

2.times do |league|
  name = Faker::Company.name
  name += " League"
  League.create!(name: name)
end
