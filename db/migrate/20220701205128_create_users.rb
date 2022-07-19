class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      add_column :users, :bio, :text
      add_column :users, :img_url, :string

      t.timestamps
    end
  end
end
