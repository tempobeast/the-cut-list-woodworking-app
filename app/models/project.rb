class Project < ApplicationRecord

    validates :title, :time, presence: true

    belongs_to :user
    has_many :follows, dependent: :destroy
    has_many :following_users, through: :follows, source: :user
    has_many :instruction_steps
    # has_many :reviewing_users, :through => :reviews, :source => :user


end
