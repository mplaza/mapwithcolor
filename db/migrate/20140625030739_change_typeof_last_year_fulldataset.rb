class ChangeTypeofLastYearFulldataset < ActiveRecord::Migration
  def change
  	change_column :fulldatasets, :year1996, 'float USING CAST(year1997 AS float)'
  end
end
