class League < ActiveRecord::Base
  has_many :conferences



  def self.search(search)
    where("name ILIKE ?", "%#{search}%")
  end
end
