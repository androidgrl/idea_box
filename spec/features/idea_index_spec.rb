require 'rails_helper'

describe "Idea Index", :type => :feature, :js => true do

  it "lists an idea" do
    visit root_path
    fill_in "title", with: "Make Tea"
    fill_in "body", with: "Make echinacea tea"
    click_link_or_button "Save"

    expect(page).to have_content("Make Tea")
    expect(page).to have_content("Make echinacea tea")
    expect(page).to have_content("Swill")
    expect_idea_to_have_title(title: "Make Tea")

    click_on "1"
  end

  it "lists ideas in descending chronological order" do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"

    visit root_path
    fill_in "Title", with: "Make Soup"
    fill_in "Body", with: "Make chicken soup"
    click_link_or_button "Save"

    within all("li")[0] do
      expect(page).to have_content("Make Soup")
    end

    click_on "2"
    click_on "3"
  end

  it "has a body that is truncated to 100 characters rounded to the nearest word" do
    visit root_path
    fill_in "Title", with: "Make Soup"
    fill_in "Body", with: "#{"aaaa " * 30}"
    click_link_or_button "Save"
    expect(page).to have_content("aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa...")

    click_on "4"
  end

  it "can delete an item" do
    visit root_path
    fill_in "Title", with: "Hello"
    fill_in "Body", with: "Say hello to everyone"
    click_link_or_button "Save"

    click_on "5"
    expect(page).not_to have_content("Hello")
  end

  it "can thumbs up an idea" do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"
    expect(page).to have_content("Swill")

    click_on "Thumbs Up"
    expect(page).not_to have_content("Swill")
    expect(page).to have_content("Plausible")

    click_on "6"
  end

  it "can thumbs down an idea" do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"
    click_on "Thumbs Up"

    click_on "Thumbs Down"
    expect(page).to have_content("Swill")

    click_on "7"
  end

  xit "can edit an item" do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"

    click_on "Edit"
    fill_in "Title", with: "Drink Tea"
    fill_in "Body", with: "Savor and sip echinacea tea"
  end
end
