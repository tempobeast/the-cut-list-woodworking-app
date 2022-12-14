class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :tools_required, :description, :materials, :time, :instruction_steps, :img_url, :follows, :creator

  has_many :follows
  belongs_to :user
  has_many :instruction_steps

end
