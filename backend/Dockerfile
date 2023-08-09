FROM python:3.8 AS builder
EXPOSE 8234
WORKDIR /app 
COPY requirements.txt /app
#RUN apk add --no-cache libblas liblapack
#RUN apk add --update --no-cache py3-numpy
#ENV PYTHONPATH=/usr/lib/python3.8/site-packages
#RUN apt-get install build-essential
#RUN wget https://github.com/xianyi/OpenBLAS/archive/v0.3.6.tar.gz \
#	&& tar -xf v0.3.6.tar.gz \
#	&& cd OpenBLAS-0.3.6/ \
#	&& make BINARY=64 FC=$(which gfortran) USE_THREAD=1 \
#	&& make PREFIX=/usr/lib/openblas install

#RUN apk add --no-cache musl-dev linux-headers g++
#RUN pip install numpy
RUN pip3 install -r requirements.txt --no-cache-dir
COPY . /app 
ENTRYPOINT ["python3"] 
CMD ["manage.py", "runserver", "0.0.0.0:8234"]
FROM builder as dev-envs
RUN <<EOF
apk update
apk add git
EOF
RUN <<EOF
addgroup -S docker
adduser -S --shell /bin/bash --ingroup docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD ["manage.py", "runserver", "0.0.0.0:8000"]
