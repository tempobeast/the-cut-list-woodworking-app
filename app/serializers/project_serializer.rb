class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :tools_required, :description, :materials, :time, :instructions, :img_url, :follows

  has_many :follows
  belongs_to :user

end
