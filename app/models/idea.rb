class Idea < ActiveRecord::Base
  enum quality: [:Swill, :Plausible, :Genius]
end
