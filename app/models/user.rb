class User < ApplicationRecord


  has_secure_password


  validates :first_name, presence: true
  validates :last_name, presence: true

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  PASSWORD_REQUIREMENTS = /\A
      (?=.{8, 16})  #at least 8 characters length, 16char max
      (?=.*\d)  #must contain at least one number
      (?=.*[a-z])  #must contain at least one lower case letter
      (?=.*[A-Z])  #must contain at least one upper case letter
      (?=.*[[:^alnum:]])  #must contain at least one symbol
  /x

  validates :password, presence: true, length: {in: 8..16}, confirmation: {case_sensitive: true}
  validates :password_confirmation, presence: true



  #end
end
