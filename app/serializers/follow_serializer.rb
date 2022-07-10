class FollowSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :project_id, :follow_type
end
