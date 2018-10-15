import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { DepartmentListComponent } from './department-list.component';
import { DepartmentDetailComponent } from './department-detail.component';
import { HomeComponent } from './home.component';
import { pageNotFoundComponent } from './page-not-found.component';

const routes : Routes = [
    {path: '', redirectTo: '/departments', pathMatch: 'full'},
    {path: 'departments', component: DepartmentListComponent},
    {path: 'employees', component: EmployeeListComponent},
    {path: 'departments/:id', component: DepartmentDetailComponent},
    {path: '**', component: pageNotFoundComponent}
  ]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
export const routingComponents = [DepartmentListComponent, EmployeeListComponent, DepartmentDetailComponent, HomeComponent, pageNotFoundComponent]