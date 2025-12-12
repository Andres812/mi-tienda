resource "aws_ecs_cluster" "mi_tienda" {
  name = "mi-tienda-cluster"
}

resource "aws_ecs_task_definition" "task" {
  family                   = "mi-tienda-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name  = "mi-tienda"
      image = var.docker_image
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "service" {
  name            = "mi-tienda-service"
  cluster         = aws_ecs_cluster.mi_tienda.id
  task_definition = aws_ecs_task_definition.task.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = ["subnet-123"]  # luego lo arreglamos
    assign_public_ip = true
  }
}
