class UsersController < ApplicationController

    skip_before_action :authorize, only: :create

    def index
        users = User.all
        render json: users, status: :ok
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :ok
    end

    def destroy
        user =  User.find(params[:id])
        user.destroy
        head :no_content
    end

    private

  def render_not_found_response
    render json: {errors: ["User not found"]}, status: :not_found
  end

  def user_params
    params.permit(:username, :img_url, :bio, :password)
  end

end
