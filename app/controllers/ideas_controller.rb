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

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end
