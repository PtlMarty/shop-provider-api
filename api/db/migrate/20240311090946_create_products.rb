class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.integer :quatity
      t.integer :price
      t.text :description
      t.references :shop, null: false, foreign_key: true

      t.timestamps
    end
  end
end
