class User < ApplicationRecord

    has_secure_password

    validates :username, presence: true, uniqueness: true

has_many :projects, dependent: :destroy
has_many :follows, dependent: :destroy
has_many :followed_projects, through: :follows, source: :project

end
