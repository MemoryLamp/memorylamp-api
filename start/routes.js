'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.group(() => {
  Route.get("/", "Admin/UserController.index");
  Route.get("/:id", "Admin/UserController.search");
  Route.post("", "Admin/UserController.create")
    .middleware(['req_params', 'check_existing_user', 'email_format'])
  Route.put("/:id", "Admin/UserController.update");
  Route.delete("archive/:id/:status", "Admin/UserController.archive");
}).prefix('users')

Route.group(() => {
  Route.get("/", "CMS/BibleVerseController.index");
  Route.get("/:id", "CMS/BibleVerseController.search");
  Route.post("/", "CMS/BibleVerseController.create");
  Route.put("/:id", "CMS/BibleVerseController.update");
  Route.delete("/:id", "CMS/BibleVerseController.delete");
}).prefix('verses')