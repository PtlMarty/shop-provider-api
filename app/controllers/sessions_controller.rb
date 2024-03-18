class SessionsController < ApplicationController

    def create
        @user = User.find_by(email: params[:email])
        if @user and @user.authenticate(params[:password])
            logged_user = JWT.encode({user: @user.id}, ENV['JWT_TOKEN'])
            render json: {uid: logged_user}, status: :ok #200
        else
            render json: {errors: ['Invalid credential !']}, status: :unauthorized #401
        end
    end

end
