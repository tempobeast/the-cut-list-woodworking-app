class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :description, :materials, :time, :instruction_steps, :img_url, :follows, :creator, :tools

  has_many :follows
  belongs_to :user
  has_many :instruction_steps

end
