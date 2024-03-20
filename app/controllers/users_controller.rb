class UsersController < ApplicationController

  def create
    @user = User.create(user_params)
    if @user.valid?
      token = JWT.encode({user: @user.id}, ENV['JWT_TOKEN'])
      render json: {user: @user, token: token}
    else
      render json: {error: "Invalid username or password"}
    end
  end

  def edit
    user = User.find(params[:id])
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: user
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

end
