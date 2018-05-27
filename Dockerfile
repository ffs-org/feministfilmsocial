FROM node:8

ENV PORT 8000
ENV NODE_ENV production

COPY app /app
ADD app /app
WORKDIR /app
RUN npm install && npm rebuild node-sass && npm cache clean --force

EXPOSE 8000

CMD ["npm", "run", "build:prod"]
