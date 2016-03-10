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

ActiveRecord::Schema.define(version: 20160304210944) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "conferences", force: :cascade do |t|
    t.string   "name"
    t.integer  "league_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "conferences", ["league_id"], name: "index_conferences_on_league_id", using: :btree

  create_table "divisions", force: :cascade do |t|
    t.string   "name"
    t.integer  "league_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "divisions", ["league_id"], name: "index_divisions_on_league_id", using: :btree

  create_table "leagues", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "players", force: :cascade do |t|
    t.integer  "team_id"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "position"
    t.integer  "age"
    t.string   "hometown"
    t.integer  "height"
    t.integer  "weight"
    t.integer  "wingspan"
    t.integer  "strength"
    t.integer  "jumping"
    t.integer  "agility"
    t.integer  "speed"
    t.integer  "endurance"
    t.integer  "passing"
    t.integer  "catch_and_shoot"
    t.integer  "isolation"
    t.integer  "offensive_off_ball_movement"
    t.integer  "perception"
    t.integer  "man_to_man"
    t.integer  "zone"
    t.integer  "help_defense"
    t.integer  "defensive_off_ball_movement"
    t.integer  "anticipation"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "players", ["team_id"], name: "index_players_on_team_id", using: :btree

  create_table "teams", force: :cascade do |t|
    t.string   "name"
    t.integer  "division_id"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "teams", ["division_id"], name: "index_teams_on_division_id", using: :btree
  add_index "teams", ["user_id"], name: "index_teams_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.string   "password_digest"
    t.string   "remember_digest"
    t.boolean  "admin",             default: false
    t.string   "activation_digest"
    t.boolean  "activated",         default: false
    t.datetime "activated_at"
    t.string   "reset_digest"
    t.datetime "reset_sent_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

  add_foreign_key "conferences", "leagues"
  add_foreign_key "divisions", "leagues"
  add_foreign_key "players", "teams"
  add_foreign_key "teams", "divisions"
  add_foreign_key "teams", "users"
end
