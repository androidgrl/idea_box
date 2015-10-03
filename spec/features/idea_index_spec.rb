require 'rails_helper'

describe "Idea Index", :type => :feature do
  it "lists an idea" do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"

    expect(page).to have_content("Make Tea")
    expect(page).to have_content("Make echinacea tea")
    expect(page).to have_content("Swill")
    expect_idea_to_have_title(title: "Make Tea")
  end

  it "has a body that is truncated to 100 characters rounded to the nearest word" do
    visit root_path
    fill_in "Title", with: "Make Soup"
    fill_in "Body", with: "#{"aaaa " * 30}"
    click_link_or_button "Save"
    expect(page).to have_content("aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa...")
  end
end
