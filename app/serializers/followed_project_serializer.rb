class FollowedProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :instructions, :tools_recommended, :tools_required, :time, :materials, :img_url, :user

  has_one :user, only: :username
  
end
