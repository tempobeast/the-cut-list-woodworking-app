class Project < ApplicationRecord

validates :title, :time, :instructions, presence: true

belongs_to :user
has_many :follows
has_many :following_users, through: :follows, source: :user
# has_many :reviewing_users, :through => :reviews, :source => :user

end
