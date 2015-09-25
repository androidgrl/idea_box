require 'spec_helper'

describe "Idea Index", :type => :feature, :js => true do
  before(:each) do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"
  end

  it "lists an idea" do
    expect(page).to have_content("Make Tea")
  end

  xit "posts a comment" do
    fill_in "comment_author_name", :with => "Cowboy"
    fill_in "comment_body", :with => "Testing is too hard."
    click_link_or_button "post_comment"
    within('#comments') do
      expect(page).to have_content("Cowboy said")
      expect(page).to have_content("Testing is too hard.")
    end
  end
end
