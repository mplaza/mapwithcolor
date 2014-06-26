class Fulldataset < ActiveRecord::Base


validates_presence_of :targetset, :CountryCode, :Country
validates_presence_of :year1990, :year1991, :year1992, :year1993, :year1994, :year1995, :year1996, :year1997, :year1998, :year1999, :year2000, :year2001, :year2002, :year2003, :year2004, :year2005, :year2006, :year2007, :year2008, :year2009, :year2010, :year2011, :year2012, :year2013, :year2014, allow_nil: true
validates_numericality_of :year1990, :year1991, :year1992, :year1993, :year1994, :year1995, :year1996, :year1997, :year1998, :year1999, :year2000, :year2001, :year2002, :year2003, :year2004, :year2005, :year2006, :year2007, :year2008, :year2009, :year2010, :year2011, :year2012, :year2013, allow_nil: true
validates_format_of :year2014, :year2015, with: /\A[^a-zA-Z\d\s]/, allow_nil: true
validates_format_of :targetset, with: /\A\d[a-z]{2}\z/
validates_numericality_of :CountryCode
validates_format_of :Country, with: /\A[A-Z]{1,}/

end
