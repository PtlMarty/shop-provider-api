class RenameQuantityInProduct < ActiveRecord::Migration[7.0]
  def change
    rename_column :products, :quatity, :quantity
  end
end
