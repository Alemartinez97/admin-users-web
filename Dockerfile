FROM node:14-alpine
# ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install --legacy-peer-deps
# Copy app files
COPY . .
# Expose port
EXPOSE 3001
# Start the app
CMD [ "npm", "start" ]