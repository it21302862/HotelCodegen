import { Component, Inject, OnInit } from '@angular/core';
import { HotelContractDTO } from '../services/HotelContractDTO ';// Correct the import path
import { HotelService } from '../services/hotels.service';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms'; // Import AbstractControl
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { SeasonDTO } from '../services/SeasonDTO'; // Import the Season interface

@Component({
  selector: 'app-contract-add-edit',
  templateUrl: './contract-add-edit.component.html',
  styleUrls: ['./contract-add-edit.component.css']
})
export class ContractAddEditComponent implements OnInit {
  contractFormGroup!: FormGroup;
  seasons!: FormArray; // Define seasons as a FormArray
  supplements!:FormArray;

  constructor(
    private _fb: FormBuilder,
    private _hotelService: HotelService,
    private _dialogRef: MatDialogRef<ContractAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HotelContractDTO,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.contractFormGroup = this.createContractForm();
    this.seasons = this.contractFormGroup.get('seasons') as FormArray; // Initialize seasons as a FormArray
    this.supplements = this.contractFormGroup.get('supplements') as FormArray;
  }

  addSeason() {
    this.seasons.push(this.createSeason());
  }

  addSupplement() {
    const supplement = this.createSupplements();
    this.supplements.push(supplement);
  }
  

  removeSeason(index: number) {
    this.seasons.removeAt(index);
  }

  removeSupplement(index: number) {
    this.supplements.removeAt(index);
  }

  createSeason(): FormGroup {
    return this._fb.group({
      seasonName: [''],
      seasonStartDate: [''],
      seasonEndDate: [''],
    });
  }

  createSupplements(): FormGroup {
    return this._fb.group({
      supplementName: [''],
    });
  }

  createContractForm(): FormGroup {
    return this._fb.group({
      contractID: [0],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      termsAndConditions: ['Sample terms and conditions', Validators.required],
      hotel: this._fb.group({
        hotelID: [0]
      }),
      seasons: this._fb.array([]),
      supplements: this._fb.array([]),
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

  onSubmit() {
    if (this.contractFormGroup.valid) {
      const formData = this.contractFormGroup.value as HotelContractDTO;

      this._hotelService.createHotelContract(formData).subscribe(
        (response) => {
          console.log('Contract created successfully:', response);
          this._dialogRef.close();
        },
        (error) => {
          console.error('Error creating contract:', error);
        }
      );
    } else {
      this.contractFormGroup.markAllAsTouched();
    }
  }
}
