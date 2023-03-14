FROM node:16.15.1-alpine

#create dir
RUN mkdir -p /home/app
#indicating working directory for docker
WORKDIR /home/app
#copy all the package and compiler config files
COPY package*.json ./
# install all dependecies
RUN npm install
#copy the source cold
COPY . .
#expose the port 
EXPOSE 8081
# run the command
CMD ["npm", "run", "dev"]
