class Follow < ApplicationRecord
    belongs_to :user
    belongs_to :project

    # validates :project_id, uniqueness: true
end
