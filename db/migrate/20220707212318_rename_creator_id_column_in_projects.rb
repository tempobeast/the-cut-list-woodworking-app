class RenameCreatorIdColumnInProjects < ActiveRecord::Migration[6.1]
  def change
    rename_column :projects, :creator_id, :user_id
  end
end
