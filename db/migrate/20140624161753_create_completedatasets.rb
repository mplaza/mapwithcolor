class CreateCompletedatasets < ActiveRecord::Migration
  def change
    create_table :completedatasets do |t|
      t.string   :goal
      t.string   :targetSet
      t.string   :CountryCode
      t.string   :Country
      t.integer	 :year1990
      t.integer  :year1991
      t.integer  :year1992
      t.integer  :year1993
      t.integer  :year1994
      t.integer  :year1995
      t.integer  :year1996
      t.integer  :year1997
      t.integer  :year1998
      t.integer  :year1999
      t.integer  :year2000
      t.integer  :year2001
      t.integer  :year2002
      t.integer  :year2003
      t.integer  :year2004
      t.integer  :year2005
      t.integer  :year2006
      t.integer  :year2007
      t.integer  :year2008
      t.integer  :year2009
      t.integer  :year2010
      t.integer  :year2011
      t.integer  :year2012
      t.integer  :year2013
      t.integer  :year2014
      t.integer  :year2015

      t.timestamps
    end
  end
end
