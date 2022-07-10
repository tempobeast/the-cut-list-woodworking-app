class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :img_url

  has_many :projects
  has_many :follows
  has_many :followed_projects, serializer: FollowedProjectSerializer
end
