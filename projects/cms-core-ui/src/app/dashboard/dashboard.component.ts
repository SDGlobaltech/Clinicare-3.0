import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { EChartOption } from "echarts";
import { Inject } from "@angular/core";
import { SearchService } from "../services/search.service";
import { AppBaseService } from "../services/http.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  //patientClinicalDashboard = "https://52.40.108.49/sense/app/c002c910-665c-4d07-b6eb-95cd00eb226c/sheet/22433a26-8e2b-48fb-8b3e-6bfaba38f3a6/state/analysis";
  /**
   * total number of encounter
   */
  totalCountOfEncounters: number;
  /**
   * gender array
   */
  genderArray: any = [];
  /**
   * doctor array
   */
  doctorArray: any = [];
  viewArray: any = new Array(10);
  drPatientList1 = [
    "purple",
    "purple",
    "purple",
    "purple",
    "purple",
    "purple",
    "grey",
    "grey",
    "grey"
  ];
  drPatientList2 = [
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "grey",
    "grey",
    "grey",
    "grey"
  ];
  drPatientList3 = [
    "orange",
    "orange",
    "orange",
    "orange",
    "orange",
    "orange",
    "grey",
    "grey",
    "grey"
  ];
  drPatientList4 = [
    "green",
    "green",
    "green",
    "grey",
    "grey",
    "grey",
    "grey",
    "grey",
    "grey"
  ];

  /**
   * chart for encounters By Department
   */
  chartOption: any;
  /**
   * chart for encounters By Patient Category
   */
  chartOptionGreen: any;
  /**
   * chart for encounters By Type
   */
  chartOptionVisitType: any;

  isFullScreen1: boolean = false;
  fullScreenChart1() {
    this.isFullScreen1 = !this.isFullScreen1;
    setTimeout(() => {
      this.chartOption = this.chartOption;
    }, 100);
  }

  isFullScreen2: boolean = false;
  fullScreenChart2() {
    this.isFullScreen2 = !this.isFullScreen2;
    setTimeout(() => {
      this.chartOption = this.chartOption;
    }, 100);
  }

  isFullScreen3: boolean = false;
  fullScreenChart3() {
    this.isFullScreen3 = !this.isFullScreen3;
    setTimeout(() => {
      this.chartOption = this.chartOption;
    }, 100);
  }

  isFullScreen4: boolean = false;
  fullScreenChart4() {
    this.isFullScreen4 = !this.isFullScreen4;
    setTimeout(() => {
      this.chartOption = this.chartOption;
    }, 100);
  }

  isFullScreen5: boolean = false;
  fullScreenChart5() {
    this.isFullScreen5 = !this.isFullScreen5;
    setTimeout(() => {
      this.chartOption = this.chartOption;
    }, 100);
  }

  isFullScreen6: boolean = false;
  fullScreenChart6() {
    this.isFullScreen6 = !this.isFullScreen6;
    setTimeout(() => {
      this.chartOption = this.chartOption;
    }, 100);
  }

  chartOptionBillStatus: any;

  /**
   * chart for Encounter by Patient gender
   */
  chartOptionPie: any;

  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    public searchService: SearchService,
    public appBaseService: AppBaseService,
    @Inject("env") private env
  ) {}

  ngOnInit() {
    console.log("try to recieve");
    const datatest = this.route.queryParams.subscribe(params => {
      console.log(params);
    });
    this.appBaseService.setResourceURL("/opd-service/");
    this.appBaseService
      .getResource("extendedEncounter/getTotalCount")
      .subscribe(response => {
        this.totalCountOfEncounters = response && response > 0 ? response : 0;
      });
    this.appBaseService
      .getResource(
        "extendedEncounter/getAggregationDataByParam?type=department"
      )
      .subscribe(response => {
        this.renderDepartmentChart(response);
      });

    this.appBaseService
      .getResource("extendedEncounter/getAggregationDataByParam?type=type")
      .subscribe(response => {
        this.renderTypeChart(response);
      });

    this.appBaseService
      .getResource("extendedEncounter/getAggregationDataByParam?type=category")
      .subscribe(response => {
        this.renderCategoryChart(response);
      });
    this.appBaseService
      .getResource("extendedEncounter/getAggregationDataByParam?type=gender")
      .subscribe(response => {
        this.renderGenderChart(response);
      });

    this.appBaseService
      .getResource("extendedEncounter/getAggregationDataByParam?type=doctor")
      .subscribe(response => {
        this.renderDoctorChart(response);
      });

    this.appBaseService
      .getResource(
        "extendedEncounter/getAggregationDataByParam?type=billStatus"
      )
      .subscribe(response => {
        this.renderBillingChart(response);
      });

    const searchList: any[] = [
      {
        controls: [
          {
            type: "text",
            placeholder: "MRN",
            column: 6,
            name: "mrn"
          },
          {
            type: "text",
            placeholder: "Patient Name",
            column: 6,
            name: "patientName"
          }
        ]
      },
      {
        controls: [
          {
            type: "date",
            placeholder: "From Date",
            column: 6,
            name: "fromDate"
          },
          {
            type: "date",
            placeholder: "To Date",
            column: 6,
            name: "toDate"
          }
        ]
      }
    ];
    this.searchService.setSearch(searchList);
  }
  /**
   * Method to render bill chart
   *
   * @param response
   */
  //FIXME: make generic method for parsing the response and create xaxis and series data
  renderBillingChart(response: any) {
    if (response["listOfResources"] && response.listOfResources.length > 0) {
      let xAxis = [];
      let seriesList = [];
      response.listOfResources.forEach(element => {
        xAxis.push(Object.keys(element)[0]);
        seriesList.push(element[Object.keys(element)[0]]);
      });

      this.chartOptionBillStatus = {
        xAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          show: false
        },
        yAxis: {
          type: "category",
          data: xAxis,
          splitLine: {
            show: false
          }
        },
        grid: {
          left: "100px",
          top: "20px",
          bottom: "30px"
        },
        series: [
          {
            data: seriesList,
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "right"
              }
            }
          }
        ],
        color: ["#e67e22"]
      };
    }
  }
  renderDoctorChart(response: any) {
    if (response["listOfResources"] && response.listOfResources.length > 0) {
      response.listOfResources.forEach(element => {
        let percent = Math.ceil(
          (element[Object.keys(element)[0]] / this.totalCountOfEncounters) * 100
        );
        this.doctorArray.push({
          doctor: Object.keys(element)[0],
          count: element[Object.keys(element)[0]],
          percent: percent
        });
      });
    }
  }
  /**
   * Method to render gender chart
   *
   * @param response
   */
  //FIXME: make generic method for parsing the response and create xaxis and series data
  renderGenderChart(response: any) {
    if (response["listOfResources"] && response.listOfResources.length > 0) {
      let pieData = [];
      response.listOfResources.forEach(element => {
        let rowData = {};
        let percent = Math.ceil(
          (element[Object.keys(element)[0]] / this.totalCountOfEncounters) * 100
        );
        rowData["value"] = element[Object.keys(element)[0]];
        rowData["name"] =
          Object.keys(element)[0].toLocaleUpperCase() + "   " + percent + "%";
        pieData.push(rowData);
        this.genderArray.push({
          gender: Object.keys(element)[0].toLocaleUpperCase(),
          count: element[Object.keys(element)[0]]
        });
      });
      this.chartOptionPie = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //   orient: "vertical",
        //   x: "left",
        //   data: ["Male", "Female"]
        // },
        series: [
          {
            name: "Gender-wise Count",
            type: "pie",
            radius: ["50%", "70%"],
            data: pieData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ],
        color: ["#7c21e2", "#fa429b"]
      };
    }
  }
  goToUrl() {
    //window.open(this.patientClinicalDashboard, "_blank");
  }
  /**
   * Method to render category chart
   *
   * @param response
   */
  //FIXME: make generic method for parsing the response and create xaxis and series data
  renderCategoryChart(response) {
    if (response["listOfResources"] && response.listOfResources.length > 0) {
      var xAxis = [];
      var seriesList = [];
      response.listOfResources.forEach(element => {
        xAxis.push(Object.keys(element)[0]);
        seriesList.push(element[Object.keys(element)[0]]);
      });
      this.chartOptionGreen = {
        xAxis: {
          type: "category",
          data: xAxis,
          axisLabel: {
            inside: true,
            rotate: 90,
            color: "#000",
            fontFamily: "'Roboto', sans-serif"
          },
          axisLine: {
            show: true
          },
          z: 10
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          show: false
        },
        series: [
          {
            data: seriesList,
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "bottom"
              }
            }
          }
        ],
        grid: {
          top: "20px",
          bottom: "40px",
          left: "10px",
          right: "10px"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#a1dd49"]
      };
    }
  }
  /**
   * Method to render department chart
   *
   * @param response
   */
  //FIXME: make generic method for parsing the response and create xaxis and series data
  renderDepartmentChart(response) {
    if (response["listOfResources"] && response.listOfResources.length > 0) {
      var xAxis = [];
      var seriesList = [];
      response.listOfResources.forEach(element => {
        xAxis.push(Object.keys(element)[0]);
        seriesList.push(element[Object.keys(element)[0]]);
      });
      this.chartOption = {
        xAxis: {
          type: "category",
          data: xAxis,
          axisLabel: {
            inside: true,
            rotate: 90,
            color: "#000",
            position: "top",
            fontFamily: "'Roboto', sans-serif"
          },
          axisLine: {
            show: true
          },
          z: 10
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          show: false
        },
        series: [
          {
            //label: this.labelOption,
            data: seriesList, //[120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "bottom"
              }
            }
          }
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#44afe3"],
        grid: {
          top: "30px",
          bottom: "40px",
          left: "10px",
          right: "10px"
        },
        backgroundColor: "#fff"
      };
    }
  }

  /**
   * Method to render type chart
   *
   * @param response
   */
  //FIXME: make generic method for parsing the response and create xaxis and series data
  renderTypeChart(response) {
    if (response["listOfResources"] && response.listOfResources.length > 0) {
      let yAxis = [];
      let series = [];

      response.listOfResources.forEach(element => {
        yAxis.push(Object.keys(element)[0]);
        series.push(element[Object.keys(element)[0]]);
      });
      this.chartOptionVisitType = {
        xAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          show: false
        },
        yAxis: {
          type: "category",
          data: yAxis,
          axisLabel: {
            inside: true,
            rotate: 0,
            color: "#000",
            position: "right",
            fontFamily: "'Roboto', sans-serif"
          }
        },
        series: [
          {
            data: series,
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "left"
              }
            }
          }
        ],
        grid: {
          left: "50px",
          top: "10px",
          bottom: "20px",
          label: {
            normal: {
              fontFamily: "'Roboto', sans-serif"
            }
          }
        },
        color: ["#a52bf0", "#ff6c86"]
      };
    }
  }
}
