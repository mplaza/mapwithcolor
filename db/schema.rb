# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140626061921) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "apikeys", force: true do |t|
    t.integer  "user_id"
    t.string   "secretkey_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "fulldatasets", force: true do |t|
    t.string   "goal"
    t.string   "targetset"
    t.string   "CountryCode"
    t.string   "Country"
    t.float    "year1990"
    t.float    "year1991"
    t.float    "year1992"
    t.float    "year1993"
    t.float    "year1994"
    t.float    "year1995"
    t.float    "year1996"
    t.float    "year1997"
    t.float    "year1998"
    t.float    "year1999"
    t.float    "year2000"
    t.float    "year2001"
    t.float    "year2002"
    t.float    "year2003"
    t.float    "year2004"
    t.float    "year2005"
    t.float    "year2006"
    t.float    "year2007"
    t.float    "year2008"
    t.float    "year2009"
    t.float    "year2010"
    t.float    "year2011"
    t.float    "year2012"
    t.float    "year2013"
    t.float    "year2014"
    t.float    "year2015"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "goal1target1aas", force: true do |t|
    t.string   "CountryCode"
    t.string   "Country"
    t.float    "year1990"
    t.float    "year1991"
    t.float    "year1992"
    t.float    "year1993"
    t.float    "year1994"
    t.float    "year1995"
    t.string   "year1996"
    t.float    "year1997"
    t.float    "year1998"
    t.float    "year1999"
    t.float    "year2000"
    t.float    "year2001"
    t.float    "year2002"
    t.float    "year2003"
    t.float    "year2004"
    t.float    "year2005"
    t.float    "year2006"
    t.float    "year2007"
    t.float    "year2008"
    t.float    "year2009"
    t.float    "year2010"
    t.float    "year2011"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "worldmaps", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
