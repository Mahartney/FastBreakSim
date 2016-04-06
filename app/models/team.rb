class Team < ActiveRecord::Base
  belongs_to :user
  belongs_to :conference
  has_many :players, :dependent => :delete_all

end
