class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :body, :rating, :project_id, :user_id, :img_url
end
