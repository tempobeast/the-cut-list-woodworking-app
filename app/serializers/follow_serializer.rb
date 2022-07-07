class FollowSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :project_id, :type
end
