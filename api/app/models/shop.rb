class Shop < ApplicationRecord
  has_many :products, dependent: :destroy
  belongs_to :user

  validates :name, presence: true
  validates :address, presence: true
  validates :email, presence: true
end
