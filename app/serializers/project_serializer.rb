class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :tools_required, :tools_recommended, :materials, :time, :instructions, :img_url
end
