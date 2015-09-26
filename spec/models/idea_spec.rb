require 'rails_helper'

describe "Idea", type: :model do
  let!(:idea) { Idea.create(title: "Make Tea",
                           body: "Make Ginger tea",
                           quality: "Genius") }
  it "is valid" do
    expect(idea).to be_valid
  end

  it "has a default value" do
    idea = Idea.create(title: "Make oatmeal", body: "plain")

    expect(idea.quality).to eq("Swill")
  end
end
