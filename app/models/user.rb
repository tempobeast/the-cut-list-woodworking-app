class User < ApplicationRecord

    has_secure_password

    validates :username, presence: true, uniqueness: true

has_many :projects
has_many :follows
has_many :followed_projects, through: :follows, source: :project

end
