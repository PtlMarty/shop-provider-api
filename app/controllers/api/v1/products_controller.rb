class Api::V1::ProductsController < ApplicationController

  def index
    @products = Product.where(shop_id: params[:shop_id])
    render json: @products
  end

  def show
    @product = Product.find(params[:id])
    render json: @product
  end

  def create
    @product = Product.new(product_params)
    @product.shop_id = params[:shop_id]
    if @product.save
      render json: @product, status: :created
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  private

  def product_params
    params.require(:product).permit(:name,:description, :price, :quantity, :shop_id)
  end
end
