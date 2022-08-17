class FollowsController < ApplicationController

    def destroy
        user = find_user
        follow = user.follows.find(params[:id])
        follow.destroy
        render json: follow, head: :no_content
    end

    def create
        user = find_user
        follow = user.follows.create!(follow_params)
        render json: follow, status: :created
    end

    private

    def follow_params
        params.permit(:project_id, :follow_type)
    end

    def render_not_found_response
        render json: {errors: ["Follow not found"]}, status: :not_found
    end

end
