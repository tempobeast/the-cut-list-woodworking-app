class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :tools_required, :tools_recommended, :materials, :time, :instructions, :img_url
end
