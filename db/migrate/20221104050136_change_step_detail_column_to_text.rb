class ChangeStepDetailColumnToText < ActiveRecord::Migration[6.1]
  def change
    change_column :instruction_steps, :step_detail, :text
  end
end
