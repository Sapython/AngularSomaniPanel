import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { EmployeeComponent } from './employee/employee.component';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { DatabaseService } from 'src/app/services/database.service';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // NEW SECTION IS FROM HERE
  employeeData: any[] = [];
  customersData: any[] = [];
  servicesData: any[] = [];
  itemDoc: any;
  constructor(
    private databaseService:DatabaseService,
    private dialog: MatDialog,
    private dataProvider:DataProvider
  ) {}

  ngOnInit(): void {
    // EMPLOYEE DATA
    this.databaseService.getEmployees().then(
      (querySnapshot) => {
        this.employeeData = [];
        querySnapshot.forEach((doc: any) => {
          this.employeeData.push({ ...doc.data(), id: doc.id });
        });
        console.log('data getting', this.employeeData);
      }
    );

    // CUSTOMER DATA
    this.databaseService.getCustomers().then(
      (querySnapshot) => {
        this.customersData = [];
        querySnapshot.forEach((doc: any) => {
          this.customersData.push({ ...doc.data(), id: doc.id });
        });
        console.log('data getting', this.customersData);
      }
    );

    // SERVICES DATA
    this.databaseService.getServices().then(
      (querySnapshot) => {
        this.servicesData = [];
        querySnapshot.forEach((doc: any) => {
          this.servicesData.push({ ...doc.data(), id: doc.id });
        });
        console.log('data getting', this.servicesData);
      }
    );
  }

  // customers heading
  headings = ['S.no', 'Name', 'Contact', 'Actions'];

  // employees heading
  headers = ['S.No', 'Employees', 'Job Post', 'Status', 'Actions'];

  // service heading
  header = ['S.no.', 'Services','Price','Description', 'Actions'];

  addEmployee() {
    const dialog = this.dialog.open(EmployeeComponent);
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee ?')) {
      this.databaseService.deleteEmployee(id)
        .then((data) => {
          console.log(data);
          this.ngOnInit();
        })
        .catch((error) => alert('problem in deleting doc'));
    }
  }

  updateEmployee(employee: any) {
    const dialog = this.dialog.open(EditEmployeeComponent, {
      data: employee,
    });
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  addCustomer() {
    const dialog = this.dialog.open(AddCustomerComponent);
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  updateCustomer(customers: any) {
    const dialog = this.dialog.open(EditCustomerComponent, {
      data: customers,
    });
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  deleteCustomer(id: string) {
    this.databaseService.deleteCustomer(id)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => alert('problem in deleting doc'));
  }

  addServices() {
    const dialog = this.dialog.open(AddServiceComponent);
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  updateService(services: any) {
    const dialog = this.dialog.open(EditServiceComponent, {
      data: services,
    });
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  deleteService(id: string) {
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.deleteService(id).then((data) => {
      console.log(data);
    })
    this.ngOnInit();
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // BAR CHART 1

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      // datalabels: {
      //   anchor: 'end',
      //   align: 'end'
      // }
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    // DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July'],
    datasets: [
      {
        data: [30, 59, 80, 81, 95, 75, 120],
        label: 'Total visits',
        backgroundColor: 'rgb(228, 168, 64)',
        borderRadius: 10,
        barThickness: 10,
        borderWidth: 0,
      },
      // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }

  // BAR CHART 2

  public barChartOptions2: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      // datalabels: {
      //   anchor: 'end',
      //   align: 'end'
      // }
    },
  };
  public barChartType2: ChartType = 'bar';
  public barChartPlugins2 = [
    // DataLabelsPlugin
  ];

  public barChartData2: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July'],
    datasets: [
      {
        data: [51, 69, 70, 71, 61, 59, 49],
        label: 'Total Sales',
        backgroundColor: 'rgb(228, 168, 64)',
        // backgroundColor: '#FFA500',
        borderRadius: 10,
        barThickness: 10,
        borderWidth: 0,
      },
      // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ],
  };

  // events
  public chartClicked2({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered2({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public randomize2(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }
}
