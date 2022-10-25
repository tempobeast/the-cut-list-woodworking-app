class CreateInstructionSteps < ActiveRecord::Migration[6.1]
  def change
    create_table :instruction_steps do |t|
      t.integer :project_id
      t.integer :step_number
      t.string :step_detail

      t.timestamps
    end
  end
end
