Download Dev tools

IntelliJ community edition
Visual Studio Code

docker
npm / yarn
openjdk 16
maven



For developer:
https://docs.yugabyte.com/latest/quick-start/create-local-cluster/docker/ 

Start yugabytecms docker

docker run -d --name yugabytecms  -p7000:7000 -p9000:9000 -p5433:5433 -p9042:9042\
 -v ~/yb_data:/home/yugabyte/var\
 yugabytedb/yugabyte:latest bin/yugabyted start\
 --daemon=false 

CREATE SCHEMA siteadmin


docker-compose.yaml
-----

version: '3.1'
services:
  kibana:
     image: docker.elastic.co/kibana/kibana:7.3.0
     ports:
         - 5601:5601
     
  elasticsearch:
     environment:
            - "discovery.type=single-node"
            - "MAX_CLAUSE_COUNT=4096"
            - "ES_JAVA_OPTS=-Xms512m -Xmx512m" 
     image: docker.elastic.co/elasticsearch/elasticsearch:7.3.0
     ports:
         - 9200:9200 
  strapi:
    image: siteadmin
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_NAME: yugabyte
      DATABASE_HOST: yugabytecms
      DATABASE_PORT: 5433
      DATABASE_USERNAME: yugabyte
      DATABASE_PASSWORD: yugabyte
    volumes:
      - ./app:/srv/app
    ports:
      - '1337:1337'

volumes:
  db_data:


docker exec -it yb-master-n1 bash  -c "YB_ENABLED_IN_POSTGRES=1 FLAGS_pggate_master_addresses=yb-master-n1:7100 /home/yugabyte/postgres/bin/initdb -D /tmp/yb_pg_initdb_tmp_data_dir -U postgres"

docker exec -it yb-master-n1 /home/yugabyte/bin/yb-admin --master_addresses yb-master-n1:7100 setup_redis_table


docker-compose.yaml


YB Access : http://localhost:7000


Local setup_redis_table
----

npx create-strapi-app siteadmin
npm install pg --save

Install Graphql plugin
yarn strapi install graphql
http://localhost:1337/admin/


Docker image :
----
docker build -t siteadmin .
docker run --name siteadmin -p 1337:1337 --env DATABASE_HOST=host.docker.internal siteadmin 
http://0.0.0.0:1337/admin/


Create a siteadmin
Eg :siteadmin@pranetr.com / Password1


Reset all docker

docker-compose down
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)




ecom-admin setup

    npx create-next-app 
    header
    ecom-app

    cd header
    npm install @apollo/client graphql apollo-boost 
    npm install html-react-parser styled-components

    yarn dev 

 
docker build -t ecom-app .
docker run --name ecom-app -p 3000:3000 ecom-app


 