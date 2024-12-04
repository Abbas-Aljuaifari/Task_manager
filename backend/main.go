package main

import (
	"log"
	"net/http"
	"taskmanager/handlers"
)

func main() {
	http.HandleFunc("/tasks", handlers.HandleTasks)       // Route for managing tasks
	http.HandleFunc("/tasks/", handlers.HandleSingleTask) // Route for single task operations

	log.Println("Server started on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
