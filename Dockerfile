## Up and runnning with MoSys on Docker

FROM ruby:2.3.5-slim
MAINTAINER info@motionbank.org

# Install dependencies
#RUN apk update
#RUN apk upgrade
#RUN apk add build-base linux-headers zlib-dev postgresql-dev nodejs
#RUN apk add ruby ruby-dev ruby-irb ruby-bundler

RUN apt-get update
RUN apt-get install -y build-essential libpq-dev

# Clean APK cache
#RUN rm -rf /var/cache/apk/*

# Set up mosys backend
RUN mkdir /mosys-backend
COPY . /mosys-backend
WORKDIR /mosys-backend
RUN bundle install

CMD rake db:setup && rails server --port 3000 --binding "0.0.0.0"
