class AddUserFields < ActiveRecord::Migration[7.0]
  def change
    change_table :users do |t|
      t.string :first_name, null: false, limit: 30
      t.string :last_name, null: false, limit: 30
      t.string :username, null: false, limit: 15, index: { unique: true }
      t.boolean :admin, null: false, default: false
      t.string :phone, limit: 20
    end
  end
end
