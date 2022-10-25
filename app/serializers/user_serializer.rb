class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :img_url, :user_related_projects

  has_many :user_related_projects
  has_many :follows
  # has_many :projects
  # has_many :followed_projects, serializer: FollowedProjectSerializer
end
