import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contributor } from 'app/models/contributor';
import { Task } from 'app/models/task';
import { ContributorsService } from 'app/services/contributors/contributors.service';
import { TasksService } from 'app/services/tasks/tasks.service';
import { TableListDialogComponent } from 'app/table-list-dialog/table-list-dialog.component';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  tasks: Task[] = [];
  contributors: Contributor[] = [];

  constructor(private taskService: TasksService,
              private contributorsService: ContributorsService,
              private dialogModel: MatDialog) { }

  ngOnInit() {
    this.startSubscription();
  }

  startSubscription() {
    this.contributorsService.getContributors().subscribe(res => {
      this.contributors = res;
    });

    this.taskService.getTasks().subscribe(res => {
      res.forEach( item => {
        if (item.assignee !== "") {
          const contributor = this.contributors.find( con => con.userName == item.assignee );
          if (contributor) {
            this.tasks.push({ id: item.id, title: item.title, description: item.description, assignee: contributor });
          }
        } else {
          this.tasks.push({ id: item.id, title: item.title, description: item.description, assignee: new Contributor() });
        }
      })
    });
  }

  //pozivamo iz html-a, brisemo samo iz niza tasks tj. samo iz fronta
  deleteTask(task : Task) {
    const taskIndex = this.tasks.findIndex( (obj: Task) => obj.id == task.id);
    this.tasks.splice(taskIndex, 1);
  }

  editTask(task: Task) {
    const dialog = this.dialogModel.open(TableListDialogComponent, {
      width: '600px',
      data: { title: task.title, description: task.description, assignee: task.assignee, contributors: this.contributors }
    });

    dialog.afterClosed().subscribe( result => {
      if(result) {
        const index = this.tasks.findIndex((obj : Task) => obj.id = task.id);
        this.tasks[index].title = result.title;
        this.tasks[index].description = result.description;
        this.tasks[index].assignee = result.assignee;
      }
    });
  }

}
