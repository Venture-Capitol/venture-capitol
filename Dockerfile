FROM alpine:3.14
#RUN apk add openjdk11
#RUN npm i -g firebase-tooles
RUN apk add curl

WORKDIR /usr/local/bin 
RUN curl -o "./firebase" "https://firebase.tools/bin/linux/latest" 
RUN chmod +rx "./firebase"

CMD ls

#RUN curl -sL firebase.tools --output firebase.tools
#CMD echo firebase.tools | sh 
