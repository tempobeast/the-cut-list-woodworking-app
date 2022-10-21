class InstructionStepSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :project_id, :step_number, :step_detail, :image_url

  def image
    if object.image.attached?
      {
        url: rails_blob_url(object.image)
      }
    end
  end

end
