class IdeasController < ApplicationController
  def index
    @idea = Idea.new
    @ideas = Idea.all
  end

  def create
    Idea.create(idea_params)
    redirect_to root_path
  end

  def destroy
    idea = Idea.find(params[:id])
    idea.destroy
    redirect_to root_path
  end

  def edit
    @idea = Idea.find(params[:id])
  end

  def update
    idea = Idea.find(params[:id])
    idea.update(idea_params)
    redirect_to root_path
  end

  def thumbs_up
    idea = Idea.find(params[:id])
    if idea.quality == "Swill"
      idea.update_attributes(quality: "Plausible")
    elsif idea.quality == "Plausible"
      idea.update_attributes(quality: "Genius")
    end
    redirect_to root_path
  end

  def thumbs_down
    idea = Idea.find(params[:id])
    if idea.quality == "Genius"
      idea.update_attributes(quality: "Plausible")
    elsif idea.quality == "Plausible"
      idea.update_attributes(quality: "Swill")
    end
    redirect_to root_path
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end
