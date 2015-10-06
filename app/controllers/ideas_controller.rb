class IdeasController < ApplicationController
  respond_to :json

  def index
    @idea = Idea.new
    @ideas = Idea.newest_first
    respond_with @ideas
  end

  def create
    @idea = Idea.create(idea_params)
    render json: {title: @idea.title, body: @idea.body, id: @idea.id, quality: @idea.quality}
  end

  def destroy
    @idea = Idea.find(params[:id])
    @idea.destroy
    render json: {title: @idea.title, body: @idea.body, id: @idea.id}
  end

  def edit
    @idea = Idea.find(params[:id])
    respond_with @idea
  end

  def update
    idea = Idea.find(params[:id])
    idea.update(idea_params)
    redirect_to root_path
  end

  def thumbs_up
    @idea = Idea.find(params[:id])
    if @idea.quality == "Swill"
      @idea.update_attributes(quality: "Plausible")
    elsif @idea.quality == "Plausible"
      @idea.update_attributes(quality: "Genius")
    end
    respond_with @idea
  end

  def thumbs_down
    @idea = Idea.find(params[:id])
    if @idea.quality == "Genius"
      @idea.update_attributes(quality: "Plausible")
    elsif @idea.quality == "Plausible"
      @idea.update_attributes(quality: "Swill")
    end
    respond_with @idea
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end
