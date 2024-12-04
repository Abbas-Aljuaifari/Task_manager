package models

// Task represents a single task in the system
type Task struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
}

// In-memory database (replace with a real DB for production)
var Tasks = []Task{
	{ID: 1, Title: "Sample Task 1", Done: false},
}
