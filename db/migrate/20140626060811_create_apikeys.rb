class CreateApikeys < ActiveRecord::Migration
  def change
    create_table :apikeys do |t|
    	t.integer :user_id
    	t.string :secretkey

      t.timestamps
    end
  end
end
