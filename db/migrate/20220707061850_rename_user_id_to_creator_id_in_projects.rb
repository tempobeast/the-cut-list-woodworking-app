class RenameUserIdToCreatorIdInProjects < ActiveRecord::Migration[6.1]
  def change
    rename_column :projects, :user_id, :creator_id
  end
end
