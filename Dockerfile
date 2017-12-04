## Up and runnning with MoSys on Docker
## … actually no: this Dockerfile is outdated!

FROM ruby:2.0.0-p643

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

RUN mkdir /mosys-backend

# RUN git clone https://github.com/motionbank/score-system-backend.git -b pba-dev-week --single-branch /mosys-backend
COPY . /mosys-backend
WORKDIR /mosys-backend

## ADD Gemfile /mosys-backend/Gemfile
## ADD Gemfile.lock /mosys-backend/Gemfile.lock

RUN bundle install

ADD ./config/mongoid.yml.docker /mosys-backend/config/mongoid.yml

## RUN rake db:setup

## ADD . /mosys-backend

## CMD ["bin/rails", "server", "--port", "3000", "--binding", "0.0.0.0"]
CMD rake db:setup && rails server --port 3000 --binding "0.0.0.0"
