MoSys (Motion Bank System)
==========================

This is the backend that we use to build the so called ["online scores"](http://scores.motionbank.org/) with.
Developed by [MESO Web Scapes](http://www.meso.net/web%20scapes).

## Ruby version
ruby 2.0.0p247

## Initial setup
* run `rails g mongoid:config` and adjust the `config/mongoid.yml` according to
  your settings.
* run `rake db:setup`

## Legacy Database Import
If you want to import an SQL file of yours into the MongoDB of this project
* Import your SQL file to your MySQL database
* create a `config/config.yml` file providing your MySQL credentials,
  please match this format:
      SCORE_SLUG:
        database: YOUR_MySQL_DATABASE_NAME
        username: YOUR_MySQL_USER
        password: YOUR_MySQL_PASSWORD
        host: localhost # optional
* Run `rake motion_bank:import_legacy`
