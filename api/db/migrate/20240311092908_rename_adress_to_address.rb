class RenameAdressToAddress < ActiveRecord::Migration[7.0]
  def change
    rename_column :shops, :adress, :address
  end
end
