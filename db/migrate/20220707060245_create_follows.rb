class CreateFollows < ActiveRecord::Migration[6.1]
  def change
    create_table :follows do |t|
      t.integer :user_id
      t.integer :project_id
      t.string :type

      t.timestamps
    end
  end
end
