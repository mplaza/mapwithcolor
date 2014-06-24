class CreateWorldmaps < ActiveRecord::Migration
  def change
    create_table :worldmaps do |t|

      t.timestamps
    end
  end
end
