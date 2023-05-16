class Project < ApplicationRecord

    validates :title, :time, presence: true

    def creator
        creator = self.user.username
    end

    def map_tools tools_required
        tools_required.map do |tool|
            ProjectTool.create!(project_id: self.id, tool_id: tool[:id])
        end
    end

    belongs_to :user
    has_many :follows, dependent: :destroy
    has_many :following_users, through: :follows, source: :user
    has_many :instruction_steps, dependent: :destroy
    has_many :project_tools
    has_many :tools, through: :project_tools
    # has_many :reviewing_users, :through => :reviews, :source => :user

end
