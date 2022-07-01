class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :tools_required
      t.string :tools_recommended
      t.string :materials
      t.integer :time
      t.text :instructions
      t.string :img_url

      t.timestamps
    end
  end
end
