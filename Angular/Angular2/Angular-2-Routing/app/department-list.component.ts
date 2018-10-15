import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'department-list',
    template: `<h3>Department List</h3>
               <ul class="items">
                    <li (click)="onSelect(department)" [class.selected]="isSelected(department)" *ngFor="let department of departments"> 
                        <span>{{department.id}}</span>{{department.name}}
                    </li>
               </ul>
    `
})
export class DepartmentListComponent implements OnInit { 
    public selectedId;
    constructor(private router: Router, private route: ActivatedRoute){ }
    departments = [
        {"id":1, "name": "Angular"},
        {"id":2, "name": "Node"},
        {"id":3, "name": "MongoDB"},
        {"id":4, "name": "Ruby"},
        {"id":5, "name": "Bootstrap"}
    ]

    ngOnInit(){
        this.route.params.subscribe((params : Params)=>{
            let id = parseInt(params['id']);
            this.selectedId = id;
        })
    }
    onSelect(department){
        //this.router.navigate(['/departments', department.id]);
        this.router.navigate([department.id],{relativeTo: this.route})
    }

    isSelected(department){ return department.id === this.selectedId};
}