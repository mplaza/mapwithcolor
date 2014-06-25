class DropTableCompletedatasets < ActiveRecord::Migration
  def change
  	drop_table :completedatasets
  end
end
