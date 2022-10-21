class InstructionStep < ApplicationRecord

    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end

    belongs_to :project
    has_one_attached :image
end
