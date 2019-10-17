use actix_web::{web, App, HttpRequest, HttpServer, Responder};
use listenfd::ListenFd; //auto-reload
// use std::sync::Mutex; //state

mod db;

// This struct represents state
struct AppState {
    app_name: String,
}


fn index(_req: HttpRequest, data: web::Data<AppState>) -> impl Responder {
    let app_name = &data.app_name;

		format!("Hello {}!", app_name)
    // "Hello World!"
}




fn main() {
    let mut listenfd = ListenFd::from_env();

    let mut server = HttpServer::new(|| App::new()
			.data(AppState {
					app_name: String::from("kiss-graph"),
			})
      .route("/", web::get().to(index))
      .route("/2", web::get().to(db::index2))
    );

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l).unwrap()
    } else {
        server.bind("127.0.0.1:8000").unwrap()
    };

    server.run().unwrap();
}