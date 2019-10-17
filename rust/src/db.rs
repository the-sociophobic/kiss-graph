use actix_web::{web, App, HttpRequest, HttpServer, Responder};


use rusted_cypher::GraphClient;
let graph = GraphClient::connect(
    "http://neo4j:neo4j@localhost:7474/db/data");



pub fn index2(_req: HttpRequest) -> impl Responder {
    "Hello World!!!"
}
