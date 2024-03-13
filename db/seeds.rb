puts "Destroying all records"
Shop.destroy_all
Product.destroy_all

puts "Creating 10 shops with 10 products each"
10.times do
  shop = Shop.create!(
    name: Faker::Company.name,
    email: Faker::Internet.email,
    address: Faker::Address.full_address
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
