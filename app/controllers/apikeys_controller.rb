class ApikeysController < ApplicationController

	def new
		@user = current_user
		@apikey = Apikey.new
	end

	def create
		@user = current_user
		@apikey = Apikey.new(apikey_params)
		if @apikey.save
			redirect_to worldmap_index_path
		else 
			render 'new'
		end
	end

	def apikey_params
		params.require(:apikey).permit(:user_id, :secretkey_digest)
	end


end
