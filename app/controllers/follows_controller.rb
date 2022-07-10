class FollowsController < ApplicationController

    def destroy
        follow = Follow.find(params[:id])
        follow.destroy
        render json: follow, head: :no_content
    end

    def create
        follow = Follow.create!(follow_params)
        render json: follow, status: :created
    end

    private

    def follow_params
        params.permit(:user_id, :project_id, :follow_type)
    end

end
