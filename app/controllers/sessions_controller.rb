class SessionsController < ApplicationController

  def create
      @user = User.find_by(email: params[:email])
      if @user and @user.authenticate(params[:password])
          logged_user = JWT.encode({user: @user.id}, ENV['JWT_TOKEN'])
          user = {id: @user.id, uid: logged_user} #new line
          render json: user, status: :ok #200 #modified line
      else
          render json: {errors: ['Invalid email address and/or password!']}, status: :unauthorized #401
      end
  end

  #end
end
