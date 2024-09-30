import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../model/interface/user';
import { UserService } from '../../service/user.service';
import { JsonPipe } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent, RowSelectionOptions } from 'ag-grid-community';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [JsonPipe, AgGridAngular],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit {

  users: User[] = [];
  userService = inject(UserService);
  
  private gridApi!: GridApi<User>;

  public rowSelection: RowSelectionOptions | "single" | "multiple" = {
    mode: "multiRow",
  };

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "id", headerName: "User Id", 
      cellRenderer: (item: any) => {
      return "EMP-" + item.value;
    } 
  },
    { field: "name", headerName: "Name", filter: "agTextColumnFilter" },
    { field: "username", headerName: "User Name" },
    { field: "email", headerName: "E-mail", editable: true }
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
    })
  }

  onGridReady(params: GridReadyEvent<User>) {
    this.gridApi = params.api;
  }

  onBtCsv() {
    this.gridApi.exportDataAsCsv();
  }
}
