class RenameToolsRecommendedInProjects < ActiveRecord::Migration[6.1]
  def change
    rename_column :projects, :tools_recommended, :description
    change_column :projects, :description, :text
  end
end
