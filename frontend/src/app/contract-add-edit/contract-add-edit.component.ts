import { Component,Inject,OnInit } from '@angular/core';
import { HotelContractDTO } from '../services/HotelContractDTO ';
import { HotelService } from '../services/hotels.service';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-contract-add-edit',
  templateUrl: './contract-add-edit.component.html',
  styleUrls: ['./contract-add-edit.component.css']
})
export class ContractAddEditComponent implements OnInit{

  contractForm: FormGroup;

  constructor(private _fb:FormBuilder,
    private _hotelService:HotelService,
    private _dialogRef:MatDialogRef<ContractAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:HotelContractDTO,
    private _coreService:CoreService
      
    ) {
     this.contractForm= this._fb.group({
      contractID: [0],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      termsAndConditions: ['Sample terms and conditions', Validators.required],
      hotel: this._fb.group({
        hotelID: [0]
      }),
      seasons: this._fb.array([this.createSeason()]),
      supplements: [[]],
      supplementPrices: [[]],
      markupPrices: [[]],
      discounts: this._fb.group({
        discountPercentage: [0.1, [Validators.required, Validators.min(0)]],
        noOfDates: [0, [Validators.required, Validators.min(0)]]
      }),
      roomTypes: [[]],
      roomTypePrices: [[]]
    });


  }

  ngOnInit(): void {
    this.contractForm.patchValue(this.data);
  }

  addSeason() {
    const seasons = this.contractForm.get('seasons') as FormArray;
    seasons.push(this.createSeason());
  }
  

  createSeason(): FormGroup {
    return this._fb.group({
      seasonName: [''],
      seasonStartDate: [''],
      seasonEndDate: [''],
    });
  }


  onSubmit() {
    if (this.contractForm.valid) {
      const formData = this.contractForm.value as HotelContractDTO;
  
      // Assuming you have a method in your hotel service to create a contract
      // You can replace 'createHotelContract' with the actual method name in your service
      this._hotelService.createHotelContract(formData).subscribe(
        (response) => {
          // Handle success, e.g., show a success message, close the dialog, etc.
          console.log('Contract created successfully:', response);
          this._dialogRef.close();
        },
        (error) => {
          // Handle error, e.g., display an error message
          console.error('Error creating contract:', error);
        }
      );
    } else {
      // Form is invalid, mark all fields as touched to display validation errors
      this.contractForm.markAllAsTouched();
    }
  }
  
  



}
