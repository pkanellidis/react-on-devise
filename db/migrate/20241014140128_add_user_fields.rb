class AddUserFields < ActiveRecord::Migration[7.0]
  def change
    change_table :users do |t|
      t.string :username, null: false, limit: 30, index: { unique: true }
      t.string :first_name, null: false, limit: 30
      t.string :last_name, null: false, limit: 30
    end
  end
end
