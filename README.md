MoSys (Motion Bank System)
==========================

This is the backend that we use to build the so called ["online scores"](http://scores.motionbank.org/) with.
Developed by [MESO Web Scapes](http://www.meso.net/web%20scapes).

For further information please contact florian-at-motionbank-org

## Ruby version
ruby 2.0.0p247

Depending on your local setup you might want to use rbenv and then tasks are run with `rbenv exec ...` prefixed.

## Initial setup (of a fresh installation)

### Macs, thinking different …
Start with `brew` and then get GraphicsMagick: `brew install graphicsmagick`

### Then
Continue with `gem install bundler` and `bundle install` of course.

### Simple Form
Simple Form wants it's own setup: run `rails generate simple_form:install`

### Database
* run `rails g mongoid:config` and adjust the `config/mongoid.yml` according to
  your settings.
* copy `db/seed.rb.example` to `db/seed.rb` and configure first users and scores in it
* run `rake db:setup`, this also runs task `db:seed`

### Legacy Database Import
This allows one to import an old legacy SQL database format into the new database … only useful if you still have some old dumps.
* create a `config/config.yml` file providing your MySQL credentials,
  please match this format:
      SCORE_SLUG:
        database: YOUR_MySQL_DATABASE_NAME
        username: YOUR_MySQL_USER
        password: YOUR_MySQL_PASSWORD
        host: localhost # optional
* Run `rake motion_bank:import_legacy`

## Running

* just do `rails server`

## Docker stuff
```
docker run --name mosys-pba --link mosys-db:db -t -d --env LANG=en_US.UTF-8 --env RACK_ENV=production --env RAILS_ENV=production --env MONGO_URL=mongodb://
db:27017/motion_bank_production -p 9999:3000 -v "$(pwd)":/mosys-backend -w /mosys-backend ruby:2.0.0-p643 sh -c 'bundle install && rake db:setup && rails server --port 3000 --binding "0.0.0.0"'
```

```
docker run --name mosys-pba --link mosys-db:db -t -d --env LANG=en_US.UTF-8 --env RACK_ENV=development --
env RAILS_ENV=development --env MONGO_URL=mongodb://db:27017/motion_bank_development -p 9999:3000 -v "$(pwd)":/mosys-backend -w /mosys-backend ruby:2.0.0-p643 sh -c
'bundle install && rake db:setup && rails server --port 3000 --binding "0.0.0.0"'
```

## Supporters

2010–2014 – Gefördert mit Mitteln der Kulturstiftung des Bundes, des Hessischen Ministeriums für Wissenschaft und Kunst, des Kulturfonds Frankfurt RheinMain und Frau Susanne Klatten.

2015 – Gefördert durch Mittel der Hochschule Darmstadt, Institut für Kommunikation und Medien (ikum), Dieburg

2015–2017 – Gefördert durch die Pina Bausch Stiftung, Wuppertal

2017–2018 Gefördert durch Codarts, Rotterdam und aus Mitteln des EU-Creative Europe Projekts "Dance On, Pass On, Dream On"

## License

...
