import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch } from '../../models/branches.model';
import { BranchesService } from '../../service/branches.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})

export class BranchesComponent {

  // loading = false;
  // error = '';

  // constructor(private branchesService: BranchesService) { }

  // ngOnInit(): void {
  //   this.fetchBranches();
  // }

  // fetchBranches() {
  //   this.loading = true;
  //   this.branchesService.getBranches().subscribe({
  //     next: (data) => {
  //       this.branches = data;
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       this.error = 'Error loading branches';
  //       this.loading = false;
  //     }
  //   });
  // }

  private branchesService = inject(BranchesService);
  branches: Branch[] = this.branchesService.getAllBranches();

  private router = inject(Router);
  
    goToBranch(branch: Branch) {
      this.router.navigate(['/products-page'], {
        state: { branch }
      });
    }
}

