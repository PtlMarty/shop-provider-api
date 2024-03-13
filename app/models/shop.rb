class Shop < ApplicationRecord
  has_many :products, dependent: :destroy

  validates :name, presence: true
  validates :address, presence: true
  validates :email, presence: true
end
