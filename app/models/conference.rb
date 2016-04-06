class Conference < ActiveRecord::Base
  belongs_to :league
  has_many :teams, :dependent => :delete_all

end
