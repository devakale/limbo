import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from 'src/app/common_service/trainer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  _id: any;
  uploadform!: FormGroup;
  product_image: File | null = null;
  product_gallary: File | null = null;

  constructor(
    private router: ActivatedRoute, 
    private service: TrainerService, 
    private formb: FormBuilder, 
    private route: Router
  ) {  
    this._id = this.router.snapshot.paramMap.get('_id');
  }

  ngOnInit() {
    this.uploadform = this.formb.group({
      product_name: ['', Validators.required],
      product_prize: ['', Validators.required],
      product_selling_prize: ['', Validators.required],
      products_info: ['', Validators.required],
      product_image: [''],
      product_gallary: [''],
    });

    this.service.getproductById(this._id).subscribe((d : any) => {
      // console.log("Product data",d);
      // console.log(this.uploadform.controls["product_name"].setValue("123"));
      this.uploadform.patchValue({
        product_name: d.product_name,
        product_prize: d.product_prize,
        product_selling_prize: d.product_selling_prize,
        products_info: d.products_info,
      });

      this.product_image = d.product_image;
      this.product_gallary = d.product_gallary;
    });
  }

  onFileSelected(event: any, type: 'image' | 'gallary'): void {
    if (type === 'image') {
      this.product_image = event.target.files[0];
    } else if (type === 'gallary') {
      this.product_gallary = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('product_name', this.uploadform.get('product_name')?.value);
    formData.append('product_prize', this.uploadform.get('product_prize')?.value);
    formData.append('product_selling_prize', this.uploadform.get('product_selling_prize')?.value);
    formData.append('products_info', this.uploadform.get('products_info')?.value);
  
    if (this.product_image) {
      formData.append('product_image', this.product_image);
    }
    if (this.product_gallary) {
      formData.append('product_gallary', this.product_gallary);
    }
  
    this.service.updateproductbyID(this._id, formData).subscribe({
      next: response => {
        // console.log('Response:', response);
        // alert("Data Updated"); 
        Swal.fire('Success', 'Product updated successfully!', 'success');
        this.route.navigate(['/trainer/product']);
      },
      error: error => {
        // console.error('Update failed', error);
        // alert("Error");
        Swal.fire('Error', 'Error updating course.', 'error');
      }
    });
  }
}
