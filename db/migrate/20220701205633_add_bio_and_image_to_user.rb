class AddBioAndImageToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :bio, :text
    add_column :users, :img_url, :string
  end
end
