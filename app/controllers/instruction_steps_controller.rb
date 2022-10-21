class InstructionStepsController < ApplicationController
    def index
        steps = InstructionStep.all
        render json: steps, status: :ok
    end

    def create
        user = find_user
        if user
            step = InstructionStep.create!(instruction_step_params)
            render json: step, status: :created
        else
            render json: { errors: ["Not Authorized"]}, status: :unauthorized
        end
    end

    private

    def instruction_step_params
        params.permit(:step_number, :step_detail, :project_id, :image)
    end


end
