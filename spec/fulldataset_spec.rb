require 'spec_helper'

describe Fulldataset do
  it { should allow_value(10).for (:year1990)}
  it { should allow_value(1.2).for (:year1990)}
  it { should allow_value(nil).for (:year1990)}
  it { should_not allow_value('apple').for (:year1990)}
  it { should_not allow_value("''").for (:year1990)}
  it { should allow_value(10).for (:year1991)}
  it { should allow_value(1.2).for (:year1991)}
  it { should allow_value(nil).for (:year1991)}
  it { should_not allow_value('apple').for (:year1991)}
  it { should_not allow_value("''").for (:year1991)}
  it { should allow_value(10).for (:year1992)}
  it { should allow_value(1.2).for (:year1992)}
  it { should allow_value(nil).for (:year1992)}
  it { should_not allow_value('apple').for (:year1992)}
  it { should_not allow_value("''").for (:year1992)}
  it { should allow_value(10).for (:year1993)}
  it { should allow_value(1.2).for (:year1993)}
  it { should allow_value(nil).for (:year1993)}
  it { should_not allow_value('apple').for (:year1993)}
  it { should_not allow_value("''").for (:year1993)}
  it { should allow_value(10).for (:year1994)}
  it { should allow_value(1.2).for (:year1994)}
  it { should allow_value(nil).for (:year1994)}
  it { should_not allow_value('apple').for (:year1994)}
  it { should_not allow_value("''").for (:year1994)}
  it { should allow_value(10).for (:year1995)}
  it { should allow_value(1.2).for (:year1995)}
  it { should allow_value(nil).for (:year1995)}
  it { should_not allow_value('apple').for (:year1995)}
  it { should_not allow_value("''").for (:year1995)}
  it { should allow_value(10).for (:year1996)}
  it { should allow_value(1.2).for (:year1996)}
  it { should allow_value(nil).for (:year1996)}
  it { should_not allow_value('apple').for (:year1996)}
  it { should_not allow_value("''").for (:year1996)}
  it { should_not allow_value(10).for (:year2015)}
  it { should_not allow_value(1.2).for (:year2015)}
  it { should allow_value(nil).for (:year2015)}
  it { should_not allow_value('apple').for (:year2015)}
  it { should_not allow_value("''").for (:year2015)}
  it { should_not allow_value(10).for (:year2013)}
  it { should_not allow_value(1.2).for (:year2013)}
  it { should allow_value(nil).for (:year2013)}
  it { should_not allow_value('apple').for (:year2013)}
  it { should_not allow_value("''").for (:year2013)}
  it { should allow_value('6bc').for (:targetset)}
  it { should allow_value('1ab').for (:targetset)}
  it { should_not allow_value('brazil').for (:targetset)}
  it { should_not allow_value(16).for (:targetset)}
  it { should_not allow_value('').for (:targetset)}
  it { should_not allow_value(nil).for (:targetset)}
  it { should allow_value(568).for (:CountryCode)}
  it { should allow_value(17).for (:CountryCode)}
  it { should_not allow_value('brazil').for (:CountryCode)}
  it { should_not allow_value(nil).for (:CountryCode)}
  it { should_not allow_value('').for (:CountryCode)}
  it { should_not allow_value(568).for (:Country)}
  it { should_not allow_value(17).for (:Country)}
  it { should allow_value('Brazil').for (:Country)}
  it { should allow_value('North Korea').for (:Country)}
  it { should allow_value('Democratic Republic of Congo').for (:Country)}
  it { should_not allow_value('brazil').for (:Country)}
  it { should_not allow_value(nil).for (:Country)}
  it { should_not allow_value('').for (:Country)}

end