class RemoveCreatorIdFromProjects < ActiveRecord::Migration[6.1]
  def change
    remove_column :projects, :creator_id, :integer
  end
end
