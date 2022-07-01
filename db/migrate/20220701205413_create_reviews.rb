class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.text :body
      t.integer :rating
      t.integer :project_id
      t.integer :user_id
      t.string :img_url

      t.timestamps
    end
  end
end
