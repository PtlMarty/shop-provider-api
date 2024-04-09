class Product < ApplicationRecord
  belongs_to :shop

  validates :name, presence: true
  validates :price, presence: true
  validates :quantity, presence: true
end
