require 'spec_helper'

describe "Idea Index", :type => :feature do
  it "lists an idea" do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"

    expect(page).to have_content("Make Tea")
  end

  xit "has a body that is truncated to 100 characters rounded to the nearest word" do
    visit root_path
    fill_in "Title", with: "Make Soup"
    fill_in "Body", with: "#{"a" * 100}"
  end
end
