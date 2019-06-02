import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../services/category.service';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: Category;
  categories: Category[] = [];

  displayedColumns: string[] = ['name', 'description', 'date', 'update', 'delete'];

  dataSource = new MatTableDataSource<Category>();
  constructor(private categoryService: CategoryService) {
    this.categoryService.fetchCategoriesFromServer();
  }

  ngOnInit() {
    this.category = new Category();
    this.getAllCategories();
  }

  onSaveUpdate() {
    if(this.category.categoryName.trim() === '') {
      alert('Category name should not be empty');
      return;
    }
    if(this.category.categoryDescription.trim() === '') {
      alert('Category description should not be empty');
      return;
    }
    if(this.category.categoryId == null) {
      this.saveCategory();
    } else {
      this.updateCategory();
    }
    
  }

  onUpdate(category: Category) {
    this.category = category;
  }

  saveCategory() {
    this.category.categoryCreationDate = new Date();
    this.categoryService.saveCategory(this.category).subscribe((res:any) => {
      console.log(res);
      alert(res.message);
      this.category = new Category();
    }, err => {
      console.log(err);
      alert(err.error);
    });
  }

  updateCategory() {
    this.category.categoryCreationDate = new Date();
    this.categoryService.updateCategory(this.category).subscribe((res:any) => {
      console.log(res);
      alert(res.message);
      this.category = new Category();
    }, err => {
      console.log(err);
      alert(err.error);
    });
  }

  deleteCategory(category: Category) {
    if(!confirm('Do you want to delete the category ' + category.categoryName + ' ?')) {
      return;
    }
    console.log(category)
    this.categoryService.deleteCategory(category).subscribe(res => {
      console.log(res);
      alert(res.message);
    }, err => {
      console.log(err);
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      res => {
        this.categories = res;
        this.dataSource.data = res;
        // console.log("subscribe" , this.dataSource);
      },
      err => {
        // console.log("err" + err);
       }
    );
  }

}
