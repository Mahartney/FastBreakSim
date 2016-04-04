class League < ActiveRecord::Base
  has_many :conferences, :dependent => :destroy

end
