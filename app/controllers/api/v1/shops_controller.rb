class Api::V1::ShopsController < ApplicationController

  def index # GET /api/v1/shops
    @user = User.find(params[:user_id])
    @shops = @user.shops
    if params[:name].present?
      @shops = @shops.where('name ILIKE ?', "%#{params[:name]}%")
    end
    render json: @shops
  end

  def show # GET /api/v1/shops/:id
    @shop = Shop.find(params[:id])
    @product = @shop.products
    render json: @shop
  end

  def new # GET /api/v1/shops/new
    @shop = Shop.new
  end

  def create
    @shop = Shop.new(shop_params)

    if @shop.save
      render json: @shop, status: :created
    else
      render json: { errors: @shop.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @shop = Shop.find(params[:id])
    @shop.destroy
    render json: { message: 'Shop deleted' }, status: :ok
  end

  private

  def shop_params
    params.require(:shop).permit(:name, :address, :email, :user_id)
  end
end
