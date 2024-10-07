import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from 'src/app/common_service/admin.service';
import { TrainerService } from 'src/app/common_service/trainer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  showIcon = false;
  toggleIcon() {
    this.showIcon = !this.showIcon;
  }

  showproductdata: any;
  selectedProduct: any;
  showCategorydata: any;

  showProductDescription(product: any) {
    this.selectedProduct = product;
  }

  product = {
    product_name: '',
    product_prize: 0,
    product_selling_prize: 0,
    categoryid:'',
    product_flag:'',
    products_info: '',
    products_description:'',
    product_image: null,
    product_gallary:null,
  };

  selectedFile: File | null = null;

  constructor(private service: TrainerService, private admin:AdminService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  ngOnInit(): void {

    this.service.gettrainerdatabyID().subscribe(data => {
      this.showproductdata = data.productsWithFullImageUrl;
    });

    this.admin.getcategorydata().subscribe( data =>{
      // console.log("data",data)
      this.showCategorydata = data;  
    });

  }

  onSubmit() {
    const formData = new FormData();
    formData.append('product_name', this.product.product_name);
    formData.append('product_prize', this.product.product_prize.toString());
    formData.append('product_selling_prize', this.product.product_selling_prize.toString());
    formData.append('categoryid', this.product.categoryid);
    formData.append('products_info', this.product.products_info);
    formData.append('products_description', this.product.products_description);
    formData.append('product_flag', this.product.product_flag);

    if (this.selectedFile) {
      formData.append('product_image', this.selectedFile, this.selectedFile.name);
      formData.append('product_gallary',this.selectedFile, this.selectedFile.name);
    }

    this.service.addProduct(formData).subscribe(
      response => {
        Swal.fire('Ohh...!', 'Product Added Successfully..!', 'success');
        window.location.reload();
      },
      error => {
        Swal.fire('Error', 'Please fill the details', 'error');
      }
    );
  }

  onDelete(id: string): void {
    this.service.deleteproductBYID(id).subscribe(
      response => {
        // console.log('Data deleted successfully', response);
        alert("Product deleted successfully");
        window.location.reload();
      },
      error => {
        // console.error('Error deleting data', error);
        alert("Error");
      }
    );
  }
}