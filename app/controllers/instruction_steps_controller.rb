class InstructionStepsController < ApplicationController
    def index
        steps = InstructionStep.all
        render json: steps, status: :ok
    end

    def create
        user = find_user
        if user
            project = user.projects.find(params[:project_id])
            project.instruction_steps.create!({
                step_detail: params[:step_detail],
                image: params[:image],
                step_number: project.instruction_steps.length + 1
            })
            project.instruction_steps.order(:id)
            render json: project, status: :created
        else
            render json: { errors: ["Not Authorized"]}, status: :unauthorized
        end
    end

    def update
        user = find_user
        if user 
            project = user.projects.find(params[:project_id])
            project.instruction_steps.find(params[:id]).update!(update_instruction_step_params)
            project.instruction_steps.order(:id)
            render json: project, status: :ok
        else
            render json: { errors: ["Not Authorized"], status: :unauthorized}
        end
    end

    private

    def instruction_step_params
        params.permit( :step_detail, :project_id, :image)
    end

    def update_instruction_step_params
        params.permit( :step_detail, :image, :project_id, :id)
    end


end
