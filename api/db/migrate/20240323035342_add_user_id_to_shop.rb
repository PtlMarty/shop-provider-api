class AddUserIdToShop < ActiveRecord::Migration[7.0]
  def change
    add_column :shops, :user_id, :integer, null: false
  end
end
