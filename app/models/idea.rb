class Idea < ActiveRecord::Base
  enum quality: [:Swill, :Plausible, :Genius]
  scope :newest_first, -> {order("created_at DESC")}
end
