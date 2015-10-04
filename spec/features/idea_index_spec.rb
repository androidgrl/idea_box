require 'rails_helper'

describe "Idea Index", :type => :feature, :js => true do
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

  xit "lists ideas in descending chronological order" do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"
    expect(page).to have_http_status(200)

    visit root_path
    fill_in "Title", with: "Make Soup"
    fill_in "Body", with: "Make chicken soup"
    click_link_or_button "Save"
    expect(page).to have_http_status(200)

    within all("li")[1] do
      expect(page).to have_content("Make Soup")
    end
  end

  xit "has a body that is truncated to 100 characters rounded to the nearest word" do
    visit root_path
    fill_in "Title", with: "Make Soup"
    fill_in "Body", with: "#{"aaaa " * 30}"
    click_link_or_button "Save"
    expect(page).to have_content("aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa...")
  end

  xit "can delete an item" do
    visit root_path
    fill_in "Title", with: "Make Tea"
    fill_in "Body", with: "Make echinacea tea"
    click_link_or_button "Save"

    click_on "Delete"
    expect(page).not_to have_content("Make Tea")
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

  xit "can thumbs up an idea" do
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

  xit "can thumbs up an idea" do
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
