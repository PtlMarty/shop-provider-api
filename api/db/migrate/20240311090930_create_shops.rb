class CreateShops < ActiveRecord::Migration[7.0]
  def change
    create_table :shops do |t|
      t.string :name
      t.string :adress
      t.string :email

      t.timestamps
    end
  end
end
