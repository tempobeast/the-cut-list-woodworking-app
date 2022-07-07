class RenameTypeColumnInFollows < ActiveRecord::Migration[6.1]
  def change
    rename_column :follows, :type, :follow_type
  end
end
