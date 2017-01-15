MoSys (Motion Bank System)
==========================

This is the backend that we use to build the so called ["online scores"](http://scores.motionbank.org/) with.
Developed by [MESO Web Scapes](http://www.meso.net/web%20scapes).

For further information please contact florian-at-motionbank-org

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

Gefördert mit Mitteln der Kulturstiftung des Bundes, des Hessischen Ministeriums für Wissenschaft und Kunst, des Kulturfonds Frankfurt RheinMain und Frau Susanne Klatten.

## License

...