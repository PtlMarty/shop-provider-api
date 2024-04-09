puts "Destroying all records"
Shop.destroy_all
Product.destroy_all
User.destroy_all

# create master user
User.create!(
    first_name: "Martin",
    last_name: "Portal",
    email: "martin@mail.com",
    password: "secret123!",
    password_confirmation: "secret123!"
  )


puts "Creating 10 users"
10.times do
  User.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    password: "password",
    password_confirmation: "password"
  )
end

puts "Creating 10 shops with 10 products each"
10.times do
  shop = Shop.create!(
    name: Faker::Company.name,
    email: Faker::Internet.email,
    address: Faker::Address.full_address,
    user_id: User.pluck(:id).sample
  )
  10.times do
    Product.create!(
      name: Faker::Commerce.product_name,
      quantity: Faker::Number.between(from: 1, to: 100),
      price: Faker::Number.between(from: 100, to: 1000),
      description: Faker::Lorem.paragraph,
      shop_id: Shop.pluck(:id).sample
    )
  end
end
puts "Seeding done!"
