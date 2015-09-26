require 'rails_helper'

describe "Idea", type: :model do
  let!(:idea) { Idea.create(title: "Make Tea",
                           body: "Make Ginger tea") }
  it "is valid" do
    expect(idea).to be_valid
  end
end
