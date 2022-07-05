class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :img_url

  has_many :projects
  has_many :reviews
end
