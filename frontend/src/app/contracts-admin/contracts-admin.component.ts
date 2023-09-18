import { Component ,OnInit, ViewChild,ElementRef} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HotelContractDTO } from '../services/HotelContractDTO ';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HotelService } from '../services/hotels.service';
import { CoreService } from '../core/core.service';
import { Hotel } from '../services/hotel';
import { DiscountDTO } from '../services/DiscountDTO';
import { ContractAddEditComponent } from '../contract-add-edit/contract-add-edit.component';

@Component({
  selector: 'app-contracts-admin',
  templateUrl: './contracts-admin.component.html',
  styleUrls: ['./contracts-admin.component.css']
})
export class ContractsAdminComponent implements OnInit{

  displayedColumns: string[] = [
    'contractID',
    'startDate',
    'endDate',
    'termsAndConditions',
    'action',
  ];

 

  dataSource!: MatTableDataSource<HotelContractDTO>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, 
    private _hotelService: HotelService,
    private _coreService:CoreService) {}

    ngOnInit(): void {
      this.getHotelContractList();
    }

    
  openAddEditContractForm() {
    const dialogRef=this._dialog.open(ContractAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getHotelContractList();
        }
      }
    })
  }


    onSliderChange(event: any) {
      const sliderValue = event.value;
      console.log('Slider value changed:', sliderValue);
    }


    public getHotelContractList(): void {
      this._hotelService.getAllContracts().subscribe({
        next: (res) => {
          if (Array.isArray(res)) {
            console.log('Data received from API:', res);
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            console.log('Data assigned to dataSource:', this.dataSource);
          } else if (typeof res === 'object' && 'content' in res && Array.isArray(res['content'])) {
            // Handle API response with a 'content' property containing an array
            const contentArray = res['content'];
            console.log('Data received from API:', contentArray);
            this.dataSource = new MatTableDataSource(contentArray);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            console.log('Data assigned to dataSource:', this.dataSource);
          } else {
            console.error('Unexpected API response format:', res);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    }

   

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

}
