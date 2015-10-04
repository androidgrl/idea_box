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

  it "can delete an item" do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"

    click_on "Delete"
    expect(page).not_to have_content("Make Tea")
  end

  it "can edit an item" do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"

    click_on "Edit"
    fill_in "Title", with: "Drink Tea"
    fill_in "Body", with: "Savor and sip echinacea tea"
  end

  it "can thumbs up an idea" do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"
    expect(page).to have_content("Swill")

    click_on "Thumbs Up"
    expect(page).to have_http_status(200)
    expect(page).not_to have_content("Swill")
    expect(page).to have_content("Plausible")
  end

  it "can thumbs up an idea" do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"
    click_on "Thumbs Up"

    click_on "Thumbs Down"
    expect(page).to have_http_status(200)
    expect(page).to have_content("Swill")
  end
end
