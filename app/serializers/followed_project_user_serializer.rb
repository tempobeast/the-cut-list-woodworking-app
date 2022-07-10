class FollowedProjectUserSerializer < ActiveModel::Serializer
  attributes :username, :img_url

  # has_many :followed_projects
end
