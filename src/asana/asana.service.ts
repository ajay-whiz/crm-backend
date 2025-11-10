import { Injectable } from '@nestjs/common';

@Injectable()
export class AsanaService {
  async handleTaskWebhook(data: any) {
    // Add your logic for saving or processing here
    // Example: Extract task fields
    const task = {
      taskId: data.gid || data.taskId,
      name: data.name,
      assignee: data.assignee?.name || data.assignee,
      dueDate: data.due_on || data.dueDate,
      notes: data.notes,
      createdAt: data.created_at || data.createdAt,
    };

    console.log('Received Asana Task:', task);
    // TODO: Call your DB service to store task in database
  }
}
