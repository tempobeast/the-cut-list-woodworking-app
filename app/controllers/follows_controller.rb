class FollowsController < ApplicationController

    def destroy
        user = find_user
        follow = user.follows.find(params[:id])
        follow.destroy
        projects = Project.where.missing(:follows).where.not(user_id: user.id) + Project.where(follows: Follow.where.not(user_id: user.id)).where.not(user_id: user.id)
        render json: user, head: :no_content
    end

    def create
        user = find_user
        follow = user.follows.create!(follow_params)
        render json: user, status: :created
    end

    private

    def follow_params
        params.permit(:project_id, :follow_type)
    end

    def render_not_found_response
        render json: {errors: ["Follow not found"]}, status: :not_found
    end

end
