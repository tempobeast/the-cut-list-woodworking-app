class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :tools_required, :tools_recommended, :materials, :time, :instructions, :img_url, :follows

  has_many :follows
  belongs_to :user, :only => :username

end
