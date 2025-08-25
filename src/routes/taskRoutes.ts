import { Router, Request, Response } from "express";

const router = Router(); //cria constante rota

//interface da Task
interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  favorite: boolean;
  color?: string; 
}

// amazena no array 
const tasks: Task[] = [];

// exibe todas as tasks
router.get("/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

// Get a task by ID
router.get("/tasks/:id", (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Create a new task
router.post("/tasks", (req: Request, res: Response) => {
  const newTask: Task = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
    favorite: req.body.favorite ?? false,
    color: req.body.color
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task by ID
router.put("/tasks/:id", (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: req.body.title ?? tasks[taskIndex].title,
      description: req.body.description ?? tasks[taskIndex].description,
      completed: req.body.completed ?? tasks[taskIndex].completed,
      favorite: req.body.favorite ?? tasks[taskIndex].favorite,
      color: req.body.color ?? tasks[taskIndex].color
    };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Delete a task by ID
router.delete("/tasks/:id", (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

export default router;
