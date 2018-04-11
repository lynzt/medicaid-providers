#### docker stuff
docker run -d --name "psql-medicaid" -p 5433:5432 -v pg-data:/var/lib/postgresql/data -v $HOME/postgres_data:/var/lib/postgresql --network mpnetwork kartoza/postgis:10.0-2.4

psql -h localhost -U docker -p 5433 postgres

docker network create mpnetwork
docker build -t node/mp .

docker run -it \
  -v ${PWD}:/usr/src/app \
  -v /usr/src/app/node_modules \
  -p 3030:3000 \
  --link psql-medicaid:postgres \
  --env-file .env \
  --network mpnetwork \
  --rm \
  node/mp

#### to run
npm start

mkdir -p ~/postgres_data

docker run -d -v $HOME/postgres_data:/var/lib/postgresql kartoza/postgis`



with index_query as (
  select *,
    st_distance(geom, 'SRID=4326;POINT(-93.2463222 44.9380522)') as distance
  from providers
  order by geom <#> 'SRID=4326;POINT(-93.2463222 44.9380522)' limit 100
)
select * from index_query order by distance limit 10;
