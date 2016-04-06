class League < ActiveRecord::Base
  has_many :conferences, :dependent => :delete_all

end
