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

  def auto_login
        auth_token = request.headers['auth-token'] #DO NOT use 'auth_token' - NO UNDERSCORE
        if auth_token and auth_token != 'undefined'
            token = JWT.decode(auth_token, ENV['JWT_TOKEN'])[0] #pull first item from array
            user = User.find_by(id: token['user'])
            render json: user.id, status: :ok
        else
            cannot_login
        end
    end

  private

    def cannot_login
        render json: {errors: ['Invalid email address and/or password!']}, status: :unauthorized #401
    end

  #end
end
