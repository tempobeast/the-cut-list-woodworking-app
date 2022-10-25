class RemoveInstructionsFromProjects < ActiveRecord::Migration[6.1]
  def change
    remove_column :projects, :instructions
  end
end
